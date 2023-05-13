import { ModelStatic } from 'sequelize';
import Product from '../database/models/Product';
import ProductModelI from '../interfaces/ProductModelI';
import ProductI from '../interfaces/ProductI';

export default class ProductModel implements ProductModelI {
  private model: ModelStatic<Product> = Product;
  constructor() {}
  async getAllProducts(): Promise<ProductI[]> {
    const products = await this.model.findAll();
    return products;
  }
}
