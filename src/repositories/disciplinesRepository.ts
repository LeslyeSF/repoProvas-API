/* eslint-disable import/no-unresolved */
import prisma from '../db.js';

export default async function getAllDisciplinesWithTests() {
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
