import { Request, Response } from 'express';

export default interface PackControllerI {
  getAllPacks(req: Request, res: Response): Promise<Response | void>;
}
