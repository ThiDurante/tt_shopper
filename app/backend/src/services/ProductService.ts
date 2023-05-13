import ProductServiceI from '../interfaces/ProductServiceI';
import ProductModelI from '../interfaces/ProductModelI';

export default class ProductService implements ProductServiceI {
  constructor(private productModel: ProductModelI) {
    this.productModel = productModel;
  }
  async getAllProducts() {
    const products = await this.productModel.getAllProducts();
    return products;
  }
}
