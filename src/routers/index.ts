/* eslint-disable import/no-unresolved */
import { Router } from 'express';
import authRouters from './authRouters.js';
import testsRouters from './testsRouters.js';

const routers = Router();

routers.use(authRouters);
routers.use(testsRouters);

export default routers;
