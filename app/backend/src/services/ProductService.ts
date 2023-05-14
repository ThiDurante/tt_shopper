import ProductServiceI from '../interfaces/Product/ProductServiceI';
import ProductModelI from '../interfaces/Product/ProductModelI';

export default class ProductService implements ProductServiceI {
  constructor(private productModel: ProductModelI) {
    this.productModel = productModel;
  }
  async getAllProducts() {
    const products = await this.productModel.getAllProducts();
    return products;
  }

  async updateProductPrice(code: string, newPrice: string) {
    const product = await this.productModel.updateProductPrice(code, newPrice);
    return product;
  }

  async findByCode(code: string) {
    const product = await this.productModel.findByCode(code);
    return product;
  }
}
