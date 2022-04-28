/* eslint-disable no-throw-literal */
/* eslint-disable import/no-unresolved */
import { Request, Response } from 'express';
import {
  verifyUserForLogin,
  deleteSession,
  getToken,
  registerUser,
  verifyUserForRegister,
} from '../services/authServices.js';

export async function signIn(req: Request, res: Response) {
  const user = req.body;

  const { id } = await verifyUserForLogin(user);

  const token = await getToken({
    id,
    ...user,
  });

  res.status(200).send({ token });
}

export async function signUp(req: Request, res: Response) {
  const user = req.body;

  await verifyUserForRegister(user.email);

  await registerUser(user);

  res.sendStatus(201);
}

export async function logOut(req: Request, res: Response) {
  const { user } = res.locals;

  await deleteSession(user.id);

  res.sendStatus(200);
}
