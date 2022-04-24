/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';

// eslint-disable-next-line consistent-return
export default function errorHandlingMiddleware(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error.response) {
    return res.sendStatus(error.response.status);
  }

  res.status(500).send(error);
}
