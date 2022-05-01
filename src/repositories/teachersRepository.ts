/* eslint-disable import/no-unresolved */
import prisma from '../db.js';

export default async function getAllTeachers() {
  const teachers = await prisma.teachers.findMany();

  return teachers;
}
