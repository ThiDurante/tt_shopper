import ProductServiceI from '../interfaces/Product/ProductServiceI';
import { Request, Response } from 'express';
import ProductControllerI from '../interfaces/Product/ProductControllerI';

class ProductController implements ProductControllerI {
  constructor(private productService: ProductServiceI) {
    this.productService = productService;
  }
  async getAllProducts(_req: Request, res: Response) {
    const products = await this.productService.getAllProducts();
    res.status(200).json(products);
  }
}

export default ProductController;
