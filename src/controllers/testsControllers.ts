/* eslint-disable import/no-unresolved */
import { Request, Response } from 'express';
import getAllDisciplinesWithTests from '../repositories/disciplinesRepository.js';
import getAllTeachersWithTests from '../repositories/teachersRepository.js';

export async function getTestsByDisciplines(req: Request, res: Response) {
  const disciplines = await getAllDisciplinesWithTests();

  res.status(200).send(disciplines);
}

export async function getTestsByTeachers(req: Request, res: Response) {
  const teachers = await getAllTeachersWithTests();

  res.status(200).send(teachers);
}
