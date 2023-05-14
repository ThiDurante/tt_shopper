import ProductI from './ProductI';

interface ProductServiceI {
  getAllProducts(): Promise<ProductI[]>;
  updateProductPrice(
    code: string,
    newPrice: string
  ): Promise<[affectedCount: number]>;
  findByCode(code: string): Promise<ProductI | null>;
}

export default ProductServiceI;
