/* eslint-disable import/no-unresolved */
import prisma from '../src/db.js';

async function main() {
  // upsert = update/insert
  // melhor que create por que pode dar conflito em campos unicos
  await prisma.users.upsert({
    where: { email: 'leslye@gmail.com' },
    update: {},
    create: {
      id: 1,
      email: 'leslye@gmail.com',
      password: 'leslye123',
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
