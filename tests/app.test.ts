/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import supertest from 'supertest';
import { faker } from '@faker-js/faker';
import app from '../src/app.js';
import prisma from '../src/db.js';

async function disconnect() {
  await prisma.$disconnect();
}

async function truncateUsers() {
  await prisma.$executeRaw`TRUNCATE TABLE "Users" CASCADE;`;
}
async function truncateTests() {
  await prisma.$executeRaw`TRUNCATE TABLE "Tests" CASCADE;`;
}

async function createUser() {
  const email = 'exemplo@gmail.com';
  const password = 'exemplo123';

  await prisma.users.create({
    data: {
      id: 1,
      email: 'exemplo@gmail.com',
      password: bcrypt.hashSync(password, 10),
    },
  });

  return {
    id: 1,
    email,
    password,
  };
}
async function createSession(email: string) {
  const token = await jwt.sign(email, process.env.JWT);
  await prisma.sessions.create({
    data: {
      id: 1,
      userId: 1,
      token,
    },
  });
  return token;
}

async function testFactory(
  invalid: 'categoryId' | 'teacherDisciplineId' | 'body' | ''
) {
  if (invalid === 'categoryId' || invalid === 'teacherDisciplineId') {
    return {
      name: faker.lorem.lines(),
      pdfUrl: faker.internet.url(),
      categoryId: 0,
      teacherDisciplineId: 0,
    };
  }
  if (invalid === 'body') {
    return {
      pdfUrl: faker.internet.url(),
      categoryId: 0,
      teacherDisciplineId: 0,
    };
  }
  const category = await prisma.categories.findFirst();
  const teacherDiscipline = await prisma.teachersDisciplines.findFirst();
  return {
    name: faker.lorem.lines(),
    pdfUrl: faker.internet.url(),
    categoryId: category.id,
    teacherDisciplineId: teacherDiscipline.id,
  };
}

async function createTest() {
  const test = await testFactory('');

  await prisma.tests.create({
    data: {
      id: 1,
      name: test.name,
      pdfUrl: test.pdfUrl,
      categoryId: test.categoryId,
      teacherDisciplineId: test.teacherDisciplineId,
    },
  });
  return { id: 1, ...test };
}

describe('POST /register', () => {
  beforeEach(truncateUsers);

  afterAll(disconnect);

  it('returns status 422 for invalid user schema', async () => {
    const body = {
      email: 'example@gmail.com',
    };

    const result = await supertest(app).post('/register').send(body);

    expect(result.status).toEqual(422);
  });

  it('returns status 409 given a duplicate data insert', async () => {
    const body = {
      email: 'example@gmail.com',
      password: '123456',
    };

    await supertest(app).post('/register').send(body);

    const result = await supertest(app).post('/register').send(body);

    expect(result.status).toEqual(409);
  });

  it('returns status 201 given a valid data insert', async () => {
    const body = {
      email: 'example@gmail.com',
      password: '123456',
    };

    const result = await supertest(app).post('/register').send(body);
    const createdUser = await prisma.users.findFirst({
      where: {
        email: body.email,
      },
    });
    expect(result.status).toEqual(201);
    expect(createdUser).not.toBeNull();
  });
});

describe('POST /login', () => {
  beforeEach(truncateUsers);

  afterAll(disconnect);

  it('should return 422 given a invalid body', async () => {
    const result = await supertest(app).post('/login').send({
      password: 'wrong_password',
    });

    expect(result.status).toEqual(422);
  });

  it('returns status 401 given a invalid password', async () => {
    const user = await createUser();

    const result = await supertest(app).post('/login').send({
      email: user.email,
      password: 'wrong_password',
    });

    expect(result.status).toEqual(401);
  });

  it('returns status 200 and a token given a valid data insert', async () => {
    const user = await createUser();

    const result = await supertest(app).post('/login').send({
      email: user.email,
      password: user.password,
    });
    const findSession = await prisma.sessions.findFirst({
      where: {
        userId: user.id,
      },
    });
    expect(result.status).toEqual(200);
    expect(typeof result.body.token).toEqual('string');
    expect(result.body.token.length).toBeGreaterThan(25);
    expect(findSession).not.toBeNull();
  });
});

describe('POST /tests/insert', () => {
  beforeEach(truncateUsers);

  afterAll(disconnect);

  it('returns status 500 given a invalid token', async () => {
    const token = 'Invalid_token';
    const body = testFactory('');

    const response = await supertest(app)
      .post('/tests/insert')
      .send(body)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toEqual(500);
  });

  it('returns status 404 given a invalid categoryId', async () => {
    const body = await testFactory('categoryId');
    const user = await createUser();
    const token = await createSession(user.email);

    const response = await supertest(app)
      .post('/tests/insert')
      .send(body)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toEqual(404);
  });

  it('returns status 404 given a invalid teacherDisciplineId', async () => {
    const body = await testFactory('teacherDisciplineId');
    const user = await createUser();
    const token = await createSession(user.email);

    const response = await supertest(app)
      .post('/tests/insert')
      .send(body)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toEqual(404);
  });

  it('should return 422 given a invalid body', async () => {
    const body = await testFactory('body');
    const user = await createUser();
    const token = await createSession(user.email);

    const response = await supertest(app)
      .post('/tests/insert')
      .send(body)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toEqual(422);
  });

  it('should return 201 and persist the user given a valid body', async () => {
    const body = await testFactory('');
    const user = await createUser();
    const token = await createSession(user.email);

    const response = await supertest(app)
      .post('/tests/insert')
      .send(body)
      .set('Authorization', `Bearer ${token}`);

    const findTest = await prisma.tests.findMany({
      where: {
        name: body.name,
        pdfUrl: body.pdfUrl,
      },
    });

    expect(response.status).toEqual(201);
    expect(findTest.length).toEqual(1);
  });
});

describe('PUT /tests/views/:id', () => {
  beforeEach(truncateUsers);
  beforeEach(truncateTests);

  afterAll(disconnect);

  it('returns status 500 given a invalid token', async () => {
    const token = 'Invalid_token';

    const response = await supertest(app)
      .put(`/tests/views/${1}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toEqual(500);
  });

  it('returns status 404 given a invalid testId', async () => {
    const testId = 0;
    const user = await createUser();
    const token = await createSession(user.email);

    const response = await supertest(app)
      .put(`/tests/views/${testId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toEqual(404);
  });

  it('returns status 200 given a valid testId', async () => {
    const test = await createTest();
    const user = await createUser();
    const token = await createSession(user.email);

    const response = await supertest(app)
      .put(`/tests/views/${test.id}`)
      .set('Authorization', `Bearer ${token}`);

    const { views } = await prisma.tests.findFirst({
      where: {
        id: test.id,
      },
    });

    expect(response.status).toEqual(200);
    expect(views).toEqual(1);
  });
});
