/* eslint-disable import/no-unresolved */
import { Router } from 'express';
import getTeachersDisciplines from '../controllers/disciplinesControllers.js';
import validateTokenMiddleware from '../middlewares/validateTokenMiddleware.js';

const disciplinesRouters = Router();

disciplinesRouters.get(
  '/disciplines/teachers',
  validateTokenMiddleware,
  getTeachersDisciplines
);

export default disciplinesRouters;
