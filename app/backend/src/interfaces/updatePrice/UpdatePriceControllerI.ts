import { Request, Response } from 'express';

export default interface UpdatePriceControllerI {
  updatePrice(req: Request, res: Response): Promise<Response | void>;
}
