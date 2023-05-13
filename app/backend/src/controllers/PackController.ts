import { Request, Response } from 'express';
import PackControllerI from '../interfaces/PackControllerI';
import PackServiceI from '../interfaces/PackServiceI';

export default class PackController implements PackControllerI {
  constructor(private packService: PackServiceI) {
    this.packService = packService;
  }

  async getAllPacks(req: Request, res: Response) {
    const packs = await this.packService.getAllPacks();
    res.status(200).json(packs);
  }
}
