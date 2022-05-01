/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import { Request, Response } from 'express';
import * as categoriesService from '../services/categoriesService.js';

export default async function getAllCategories(req: Request, res: Response) {
  const categories = await categoriesService.findMany();
  res.status(200).send({ categories });
}
