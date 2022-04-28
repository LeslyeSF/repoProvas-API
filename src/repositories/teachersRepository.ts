/* eslint-disable import/no-unresolved */
import prisma from '../db.js';

export async function getAllTeachersWithTests() {
  const teachers = await prisma.teachers.findMany({
    include: {
      TeachersDisciplines: {
        include: {
          Tests: true,
        },
      },
    },
  });
  return teachers;
}

export async function getAllTeachers() {
  const teachers = await prisma.teachers.findMany();

  return teachers;
}
