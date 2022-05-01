/* eslint-disable import/no-unresolved */
import { getDiciplinesWithTeachers } from '../repositories/disciplinesRepository.js';

function formatList(list: any) {
  const newList = [];
  for (let i = 0; i < list.length; i += 1) {
    const listTeachers = list[i].TeachersDisciplines.map((data) => ({
      teachersDisciplinesId: data.id,
      teacher: data.teacher.name,
    }));
    newList.push({
      discipline: list[i].name,
      teachers: listTeachers,
    });
  }
  return newList;
}

export default async function findTeachersDiscipline() {
  const listTeacherDisciplines = await getDiciplinesWithTeachers();

  const newList = formatList(listTeacherDisciplines);

  return newList;
}
