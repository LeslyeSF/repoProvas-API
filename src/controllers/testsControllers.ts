/* eslint-disable import/no-unresolved */
import { Request, Response } from 'express';
import getTests from '../services/testsServices.js';

export async function getTestsByDisciplines(req: Request, res: Response) {
  const disciplines = await getTests('disciplines');

  res.status(200).send(disciplines);
}

export async function getTestsByTeachers(req: Request, res: Response) {
  const teachers = await getTests('teachers');

  res.status(200).send(teachers);
}
