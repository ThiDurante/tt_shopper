import ProductI from './ProductI';

export default interface ProductModelI {
  getAllProducts(): Promise<ProductI[]>;
  findByCode(code: string): Promise<ProductI | null>;
  updateProductPrice(
    code: string,
    newPrice: string
  ): Promise<[affectedCount: number]>;
}
