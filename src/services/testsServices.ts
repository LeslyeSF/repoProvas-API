/* eslint-disable no-throw-literal */
/* eslint-disable import/no-unresolved */
import { getCategoryById } from '../repositories/categoriesRepository.js';
import {
  getAllDisciplinesWithTests,
  getTeacherDisciplineById,
} from '../repositories/disciplinesRepository.js';
import { getAllTeachersWithTests } from '../repositories/teachersRepository.js';
import createNewTest from '../repositories/testsRepository.js';
import { createTestsData } from '../utils/testUtils.js';

export async function getTests(testsBy: 'teachers' | 'disciplines') {
  if (testsBy === 'disciplines') {
    const disciplines = await getAllDisciplinesWithTests();
    return disciplines;
  }
  const teachers = await getAllTeachersWithTests();
  return teachers;
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
