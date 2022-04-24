/* eslint-disable import/no-unresolved */
import prisma from '../db.js';

export async function createSession(userId: number, token: string) {
  await prisma.sessions.create({
    data: {
      token,
      userId,
    },
  });
}

export async function deleteSessionByUserId(userId: number) {
  await prisma.sessions.delete({
    where: {
      userId,
    },
  });
}
