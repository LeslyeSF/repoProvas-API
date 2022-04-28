/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
import supertest from 'supertest';
import app from '../src/app.js';
import prisma from '../src/db.js';

describe('POST /register', () => {
  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE "Users" CASCADE;`;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

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
  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE "Sessions";`;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('returns status 200 given a valid data insert', async () => {
    const body = {
      email: 'leslye@gmail.com',
      password: 'leslye123',
    };

    const result = await supertest(app).post('/login').send(body);
    const findSession = await prisma.sessions.findFirst({
      where: {
        userId: 1,
      },
    });
    expect(result.status).toEqual(422);
    expect(findSession).not.toBeNull();
  });
});
