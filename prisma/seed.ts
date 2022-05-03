/* eslint-disable import/no-unresolved */
import prisma from '../src/db.js';

async function main() {
  // upsert = update/insert
  // melhor que create por que pode dar conflito em campos unicos

  await prisma.categories.upsert({
    where: { name: 'P1' },
    update: {},
    create: {
      name: 'P1',
    },
  });

  await prisma.categories.upsert({
    where: { name: 'P2' },
    update: {},
    create: {
      name: 'P2',
    },
  });

  await prisma.terms.upsert({
    where: { number: '1' },
    update: {},
    create: {
      number: '1',
    },
  });

  await prisma.terms.upsert({
    where: { number: '2' },
    update: {},
    create: {
      number: '2',
    },
  });

  await prisma.teachers.upsert({
    where: { name: 'Josefa B.' },
    update: {},
    create: {
      name: 'Josefa B.',
    },
  });

  await prisma.disciplines.upsert({
    where: { name: 'Literatura' },
    update: {},
    create: {
      name: 'Literatura',
      termId: 1,
    },
  });

  await prisma.teachersDisciplines.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      teacherId: 1,
      disciplineId: 1,
    },
  });
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
