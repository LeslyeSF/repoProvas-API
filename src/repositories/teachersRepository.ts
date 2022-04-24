/* eslint-disable import/no-unresolved */
import prisma from '../db.js';

export default async function getAllTeachersWithTests() {
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
