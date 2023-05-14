import { NextFunction, Request, Response } from 'express';

export default interface UpdatePriceControllerI {
  updatePrice(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void>;
}
