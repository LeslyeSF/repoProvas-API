import { Users } from '@prisma/client';
// eslint-disable-next-line import/no-unresolved
import prisma from '../db.js';

type CreateUserData = Omit<Users, 'id'>;

export async function createNewUser(user: CreateUserData) {
  await prisma.users.create({
    data: user,
  });
}

export async function findUserByEmail(email: string) {
  const user = await prisma.users.findFirst({
    where: {
      email,
    },
  });
  return user;
}
