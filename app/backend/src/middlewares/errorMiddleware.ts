import { NextFunction, Request, Response } from 'express';

const errorMiddleware = (
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): Response | void => {
  console.log('errorMiddleware: ', error);
  return res.status(500).json({ error: error.message });
};

export default errorMiddleware;
