/* eslint-disable no-throw-literal */
import { NextFunction, Response, Request } from 'express';
// eslint-disable-next-line import/no-unresolved
import userSchema from '../schemas/userSchema.js';

export default function validateUserSchemaMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = req.body;

  const validation = userSchema.validate(user, { abortEarly: true });
  if (validation.error) {
    console.log(validation.error.details);
    throw { type: 'unprocessable_entity' };
  }

  next();
}
