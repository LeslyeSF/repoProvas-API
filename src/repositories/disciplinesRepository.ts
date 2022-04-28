/* eslint-disable import/no-unresolved */
import prisma from '../db.js';

export async function getAllDisciplinesWithTests() {
  const disciplines = await prisma.disciplines.findMany({
    include: {
      TeachersDisciplines: {
        include: {
          Tests: true,
        },
      },
    },
  });
  return disciplines;
}

export async function getDisciplineById(id: number) {
  const discipline = await prisma.disciplines.findFirst({
    where: {
      id,
    },
  });
  return discipline;
}

export async function getTeacherDisciplineById(id: number) {
  const teacherDiscipline = await prisma.teachersDisciplines.findFirst({
    where: {
      id,
    },
  });

  return teacherDiscipline;
}
