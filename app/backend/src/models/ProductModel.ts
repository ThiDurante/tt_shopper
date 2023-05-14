import { ModelStatic, where } from 'sequelize';
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

  async findByCode(code: string): Promise<ProductI | null> {
    const product = await this.model.findOne({
      where: { code },
    });
    if (!product) {
      return null;
    }
    return product.dataValues;
  }

  async updateProductPrice(
    code: string,
    newPrice: string
  ): Promise<[affectedCount: number]> {
    const updatedProduct = await this.model.update(
      { sales_price: newPrice },
      { where: { code } }
    );
    return updatedProduct;
  }
}
