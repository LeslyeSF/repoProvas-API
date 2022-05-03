/* eslint-disable import/no-unresolved */
import { Router } from 'express';
import {
  addViews,
  getAllTests,
  getTestsByDisciplines,
  getTestsByTeachers,
  insertTest,
} from '../controllers/testsControllers.js';
import validateTestSchemaMiddleware from '../middlewares/validateTestSchemaMiddleware.js';
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
testsRouters.post(
  '/tests/insert',
  validateTokenMiddleware,
  validateTestSchemaMiddleware,
  insertTest
);
testsRouters.put('/tests/views/:id', validateTokenMiddleware, addViews);
testsRouters.get('/tests', validateTokenMiddleware, getAllTests);

export default testsRouters;
