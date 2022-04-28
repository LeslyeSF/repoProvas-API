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

export async function getTestBYTeacher(teacheName: string) {
  const test = teacheName;

  return test;
}
