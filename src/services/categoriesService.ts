/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-unresolved */
import { getAllCategories } from '../repositories/categoriesRepository.js';

export async function findMany() {
  const categories = await getAllCategories();

  return categories;
}
