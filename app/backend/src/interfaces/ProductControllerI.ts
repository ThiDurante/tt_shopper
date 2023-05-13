import { Request, Response } from 'express';

interface ProductControllerI {
  getAllProducts(req: Request, res: Response): Promise<Response | void>;
}

export default ProductControllerI;
