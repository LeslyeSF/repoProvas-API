/* eslint-disable no-throw-literal */
/* eslint-disable import/no-unresolved */
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import {
  createSession,
  deleteSessionByUserId,
} from '../repositories/sessionsRepository.js';
import {
  createNewUser,
  findUserByEmail,
} from '../repositories/userRepository.js';
import userSchema from '../schemas/userSchema.js';

dotenv.config();

export async function signIn(req: Request, res: Response) {
  const user = req.body;

  const validation = userSchema.validate(user, { abortEarly: true });
  if (validation.error) {
    console.log(validation.error.details);
    res.sendStatus(422);
  }

  const verifyUser = await findUserByEmail(user.email);
  if (!verifyUser)
    throw { type: 'not found', message: 'The user was not found' };
  if (!bcrypt.compareSync(user.password, verifyUser.password))
    throw { type: 'unauthorized', message: 'The password is wrong' };

  const token = jwt.sign(user.email, process.env.JWT);

  await createSession(verifyUser.id, token);

  res.status(200).send({ token });
}

export async function signUp(req: Request, res: Response) {
  const user = req.body;

  const validation = userSchema.validate(user, { abortEarly: true });
  if (validation.error) {
    console.log(validation.error.details);
    res.sendStatus(422);
  }

  const verifyUser = await findUserByEmail(user.email);
  if (verifyUser)
    throw { type: 'conflict', message: 'This email is already in use' };

  user.password = bcrypt.hashSync(user.password, 10);

  await createNewUser(user);

  res.sendStatus(201);
}

export async function logOut(req: Request, res: Response) {
  const { user } = res.locals;

  await deleteSessionByUserId(user.id);

  res.sendStatus(200);
}
