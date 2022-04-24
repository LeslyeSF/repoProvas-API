/* eslint-disable import/no-unresolved */
import { Router } from 'express';
import {
  getTestsByDisciplines,
  getTestsByTeachers,
} from '../controllers/testsControllers.js';
import validateTokenMiddleware from '../middlewares/validateTokenMiddleware.js';

const testsRouters = Router();

testsRouters.get(
  '/tests/teachers',
  validateTokenMiddleware,
  getTestsByTeachers
);
testsRouters.get(
  '/tests/disciplines',
  validateTokenMiddleware,
  getTestsByDisciplines
);

export default testsRouters;
