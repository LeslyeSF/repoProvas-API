/* eslint-disable import/no-unresolved */
import { Router } from 'express';
import authRouters from './authRouters.js';
import categoriesRouters from './categoriesRouter.js';
import disciplinesRouters from './disciplinesRouter.js';
import testsRouters from './testsRouters.js';

const routers = Router();

routers.use(authRouters);
routers.use(testsRouters);
routers.use(categoriesRouters);
routers.use(disciplinesRouters);

export default routers;
