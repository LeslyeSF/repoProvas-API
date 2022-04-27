/* eslint-disable no-throw-literal */
/* eslint-disable import/no-unresolved */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {
  createSession,
  deleteSessionByUserId,
  findSessionByUser,
} from '../repositories/sessionsRepository.js';
import {
  createNewUser,
  findUserByEmail,
} from '../repositories/userRepository.js';
import { createUserData, User } from '../utils/authUtils.js';

export async function findUser(email: string) {
  const user = await findUserByEmail(email);
  if (!user) throw { type: 'not_found', message: 'The user was not found' };
  return user;
}

export async function verifyUserForLogin(user: createUserData) {
  const verifyUser = await findUser(user.email);
  if (!bcrypt.compareSync(user.password, verifyUser.password))
    throw { type: 'unauthorized', message: 'The password is wrong' };

  return verifyUser;
}

export async function createToken(userEmail: string, userId: number) {
  const token = await jwt.sign(userEmail, process.env.JWT);

  await createSession(userId, token);

  return token;
}

export async function getToken(user: User) {
  const verifySession = await findSessionByUser(user.id);
  if (verifySession) {
    return verifySession.token;
  }

  const token = await createToken(user.email, user.id);

  return token;
}

export async function verifyUserForRegister(email: string) {
  const verifyUser = await findUserByEmail(email);
  if (verifyUser)
    throw { type: 'conflict', message: 'This email is already in use' };
}

export async function registerUser(user: createUserData) {
  user.password = bcrypt.hashSync(user.password, 10);

  await createNewUser(user);
}

export async function deleteSession(userId: number) {
  await deleteSessionByUserId(userId);
}
