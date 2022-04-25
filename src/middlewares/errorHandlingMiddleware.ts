/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';

// eslint-disable-next-line consistent-return
export default function errorHandlingMiddleware(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(error.type);

  if (error.type) {
    return res.send(error.message);
  }

  res.status(500).send(error);
}
