/* eslint-disable import/no-unresolved */
import prisma from '../db.js';

export async function getTeacherDisciplineById(id: number) {
  const teacherDiscipline = await prisma.teachersDisciplines.findFirst({
    where: {
      id,
    },
  });

  return teacherDiscipline;
}

export async function getAllDisciplines() {
  const disciplines = await prisma.disciplines.findMany({
    include: {
      term: true,
    },
  });

  return disciplines;
}

export async function getDiciplinesWithTeachers() {
  const list = await prisma.disciplines.findMany({
    include: {
      TeachersDisciplines: {
        include: {
          teacher: true,
        },
      },
    },
  });

  return list;
}
