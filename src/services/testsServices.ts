/* eslint-disable import/no-unresolved */
import getAllDisciplinesWithTests from '../repositories/disciplinesRepository.js';
import getAllTeachersWithTests from '../repositories/teachersRepository.js';

export default async function getTests(testsBy: 'teachers' | 'disciplines') {
  if (testsBy === 'disciplines') {
    const disciplines = await getAllDisciplinesWithTests();
    return disciplines;
  }
  const teachers = await getAllTeachersWithTests();
  return teachers;
}
