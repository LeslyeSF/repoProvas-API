// eslint-disable-next-line import/no-unresolved
import prisma from '../db.js';

export async function getCategoryById(id: number) {
  const category = await prisma.categories.findFirst({
    where: {
      id,
    },
  });

  return category;
}

export async function getAllCategories() {
  const categories = await prisma.categories.findMany();

  return categories;
}
