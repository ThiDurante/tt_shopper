import { NextFunction, Request, Response } from 'express';
import UpdatePriceControllerI from '../interfaces/updatePrice/UpdatePriceControllerI';
import UpdatePriceServiceI from '../interfaces/updatePrice/UpdatePriceServiceI';

export default class UpdatePriceController implements UpdatePriceControllerI {
  constructor(private updatePriceService: UpdatePriceServiceI) {}

  async updatePrice(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.updatePriceService.updatePrice(req.body);
      console.log('controller result', result);

      return res.status(200).json(result);
    } catch (error: any) {
      next(error);
    }
  }
}
