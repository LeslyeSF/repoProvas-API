/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */

import { Tests, Teachers } from '.prisma/client';
import { getAllTerms } from '../services/testsServices.js';

export type createTestsData = Omit<Tests, 'id'>;

export function formatTestList(tests: any) {
  const list = [];
  for (let i = 0; i < tests.length; i += 1) {
    list.push({
      idTest: tests[i].id,
      nameTest: tests[i].name,
      pdfUrl: tests[i].pdfUrl,
      views: tests[i].views,
      category: tests[i].category.name,
      discipline: tests[i].teacherDiscipline.discipline.name,
      term: tests[i].teacherDiscipline.discipline.term.number,
      teacher: tests[i].teacherDiscipline.teacher.name,
    });
  }
  return list;
}

export function filterTestsByTeachers(tests: any, teachers: Teachers[]) {
  const list = formatTestList(tests);
  const listByTeacher = [];
  for (let i = 0; i < teachers.length; i += 1) {
    listByTeacher.push({
      teacher: teachers[i].name,
    });
  }
  for (let i = 0; i < teachers.length; i += 1) {
    listByTeacher[i].tests = list.filter(
      (data) => data.teacher === listByTeacher[i].teacher
    );
  }
  return listByTeacher;
}

export async function filterTestsByDisciplines(tests: any, disciplines: any) {
  const list = formatTestList(tests);
  const terms = await getAllTerms();
  const listByDisciplines = [];

  for (let i = 0; i < disciplines.length; i += 1) {
    listByDisciplines.push({
      discipline: disciplines[i].name,
      term: disciplines[i].term.number,
    });
  }
  for (let i = 0; i < disciplines.length; i += 1) {
    listByDisciplines[i].tests = list.filter(
      (data) => data.discipline === listByDisciplines[i].discipline
    );
  }

  const listByTerms = [];
  for (let i = 0; i < terms.length; i += 1) {
    listByTerms.push({
      term: terms[i].number,
    });
  }
  for (let i = 0; i < listByTerms.length; i += 1) {
    listByTerms[i].disciplines = listByDisciplines.filter(
      (data) => data.term === listByTerms[i].term
    );
  }
  return listByTerms;
}
