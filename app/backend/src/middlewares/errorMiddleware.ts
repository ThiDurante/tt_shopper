import { NextFunction, Request, Response } from 'express';

const errorMiddleware = (
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): Response | void => {
  console.log(error.message);

  return res.status(500).json({ error: error.message });
};

export default errorMiddleware;
