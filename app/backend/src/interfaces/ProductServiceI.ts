import ProductI from './ProductI';

interface ProductServiceI {
  getAllProducts(): Promise<ProductI[]>;
}

export default ProductServiceI;
