/* eslint-disable no-throw-literal */
/* eslint-disable import/no-unresolved */
import { getCategoryById } from '../repositories/categoriesRepository.js';
import { getTeacherDisciplineById } from '../repositories/disciplinesRepository.js';
import {
  createNewTest,
  getAllTests,
  getTerms,
  getTestById,
  updateTestViews,
} from '../repositories/testsRepository.js';
import { createTestsData } from '../utils/testUtils.js';

export async function getTests() {
  const tests = await getAllTests();

  return tests;
}

export async function verifyCategory(categoryId: number) {
  const category = await getCategoryById(categoryId);
  if (!category) throw { type: 'not_found' };
}

export async function verifyTeacherDiscipline(teacherDisciplineId: number) {
  const teacherDiscipline = await getTeacherDisciplineById(teacherDisciplineId);
  if (!teacherDiscipline) throw { type: 'not_found' };
}

export async function verifyTestData(test: createTestsData) {
  await verifyCategory(test.categoryId);

  await verifyTeacherDiscipline(test.teacherDisciplineId);
}

export async function createTest(test: createTestsData) {
  await createNewTest(test);
}

export async function getAllTerms() {
  const terms = await getTerms();

  return terms;
}

export async function incrementViews(id: number) {
  const test = await getTestById(id);
  if (!test) throw { type: 'not_found' };

  await updateTestViews(id, test.views + 1);
}
