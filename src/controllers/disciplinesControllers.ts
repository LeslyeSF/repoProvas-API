/* eslint-disable import/no-unresolved */
import { Request, Response } from 'express';
import findTeachersDiscipline from '../services/disciplinesService.js';

export default async function getTeachersDisciplines(
  req: Request,
  res: Response
) {
  const list = await findTeachersDiscipline();

  res.status(200).send(list);
}
