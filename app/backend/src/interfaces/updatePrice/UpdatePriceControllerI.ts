import { NextFunction, Request, Response } from 'express';

export default interface UpdatePriceControllerI {
  validate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void>;
  updatePrice(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void>;
}
