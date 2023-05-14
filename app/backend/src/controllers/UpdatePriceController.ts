import { Request, Response } from 'express';
import UpdatePriceControllerI from '../interfaces/updatePrice/UpdatePriceControllerI';
import UpdatePriceServiceI from '../interfaces/updatePrice/UpdatePriceServiceI';

export default class UpdatePriceController implements UpdatePriceControllerI {
  constructor(private updatePriceService: UpdatePriceServiceI) {}

  async updatePrice(req: Request, res: Response) {
    try {
      const result = await this.updatePriceService.updatePrice(req.body);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}
