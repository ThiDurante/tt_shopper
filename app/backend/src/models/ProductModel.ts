import { ModelStatic } from 'sequelize';
import Product from '../database/models/Product';
import ProductModelI from '../interfaces/Product/ProductModelI';
import ProductI from '../interfaces/Product/ProductI';

export default class ProductModel implements ProductModelI {
  private model: ModelStatic<Product> = Product;
  async getAllProducts(): Promise<ProductI[]> {
    const products = await this.model.findAll();
    const productClean = products.map((product) => product.dataValues);
    return productClean;
  }
}
