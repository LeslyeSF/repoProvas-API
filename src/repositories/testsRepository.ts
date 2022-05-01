/* eslint-disable import/no-unresolved */
import prisma from '../db.js';
import { createTestsData } from '../utils/testUtils.js';

export async function createNewTest(test: createTestsData) {
  await prisma.tests.create({
    data: test,
  });
}

export async function getTestById(id: number) {
  const test = await prisma.tests.findFirst({
    where: {
      id,
    },
  });

  return test;
}

export async function getTestsByTeacher() {
  const tests = await prisma.teachers.findMany({
    include: {
      TeachersDisciplines: {
        include: {
          discipline: true,
          Tests: {
            include: {
              category: true,
            },
          },
        },
      },
    },
  });

  return tests;
}

export async function getTestsByDisciplines() {
  const tests = await prisma.disciplines.findMany({
    include: {
      term: true,
      TeachersDisciplines: {
        include: {
          teacher: true,
          Tests: {
            include: {
              category: true,
            },
          },
        },
      },
    },
  });

  return tests;
}

export async function getAllTests() {
  const tests = await prisma.tests.findMany({
    include: {
      category: true,
      teacherDiscipline: {
        include: {
          teacher: true,
          discipline: {
            include: {
              term: true,
            },
          },
        },
      },
    },
  });

  return tests;
}

export async function getTerms() {
  const terms = await prisma.terms.findMany();

  return terms;
}

export async function updateTestViews(id: number, views: number) {
  await prisma.tests.update({
    where: {
      id,
    },
    data: {
      views,
    },
  });
}
