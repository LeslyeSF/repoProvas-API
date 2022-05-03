/* eslint-disable import/no-unresolved */
import { Request, Response } from 'express';
import { getAllDisciplines } from '../repositories/disciplinesRepository.js';
import getAllTeachers from '../repositories/teachersRepository.js';
import {
  createTest,
  getTests,
  incrementViews,
  verifyTestData,
} from '../services/testsServices.js';
import {
  filterTestsByDisciplines,
  filterTestsByTeachers,
} from '../utils/testUtils.js';

export async function getTestsByDisciplines(req: Request, res: Response) {
  const tests = await getTests();

  const disciplines = await getAllDisciplines();

  const testsByDisciplines = await filterTestsByDisciplines(tests, disciplines);

  res.status(200).send(testsByDisciplines);
}

export async function getTestsByTeachers(req: Request, res: Response) {
  const tests = await getTests();

  const teachers = await getAllTeachers(); // service

  const testsByTeachers = filterTestsByTeachers(tests, teachers);

  res.status(200).send(testsByTeachers);
}

export async function insertTest(req: Request, res: Response) {
  const test = req.body;

  await verifyTestData(test);

  await createTest(test);

  res.sendStatus(201);
}

export async function addViews(req: Request, res: Response) {
  const { id } = req.params;

  await incrementViews(Number(id));

  res.sendStatus(200);
}

export async function getAllTests(req: Request, res: Response) {
  const tests = await getTests();

  res.status(200).send(tests);
}
