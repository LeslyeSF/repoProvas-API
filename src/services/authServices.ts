/* eslint-disable no-throw-literal */
/* eslint-disable import/no-unresolved */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import {
  createSession,
  findSessionByUser,
} from '../repositories/sessionsRepository.js';
import { findUserByEmail } from '../repositories/userRepository.js';
import userSchema from '../schemas/userSchema.js';

dotenv.config();

export default async function verifySignIn(user: any) {
  const validation = userSchema.validate(user, { abortEarly: true });
  if (validation.error) throw { type: 'bad request' };

  const verifyUser = await findUserByEmail(user.email);
  if (!verifyUser)
    throw { type: 'not found', message: 'The user was not found' };
  if (!bcrypt.compareSync(user.password, verifyUser.password))
    throw { type: 'unauthorized', message: 'The password is wrong' };

  const verifySession = await findSessionByUser(verifyUser.id);
  if (verifySession) return verifySession.token;

  const token = await jwt.sign(user.email, process.env.JWT);

  await createSession(verifyUser.id, token);

  return token;
}
