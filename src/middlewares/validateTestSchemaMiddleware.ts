/* eslint-disable no-throw-literal */
import { NextFunction, Response, Request } from 'express';
// eslint-disable-next-line import/no-unresolved
import testSchema from '../schemas/testSchema.js';

export default function validateTestSchemaMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const test = req.body;

  const validation = testSchema.validate(test, { abortEarly: true });
  if (validation.error) {
    console.log(validation.error.details);
    throw { type: 'unprocessable_entity' };
  }

  next();
}
