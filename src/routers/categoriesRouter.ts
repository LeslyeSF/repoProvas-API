/* eslint-disable import/no-unresolved */
import { Router } from 'express';
import validateTokenMiddleware from '../middlewares/validateTokenMiddleware.js';
import getAllCategories from '../controllers/categoriesController.js';

const categoriesRouters = Router();

categoriesRouters.get('/categories', validateTokenMiddleware, getAllCategories);

export default categoriesRouters;
