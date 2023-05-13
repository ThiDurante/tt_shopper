import ProductI from './ProductI';

export default interface ProductModelI {
  getAllProducts(): Promise<ProductI[]>;
}
