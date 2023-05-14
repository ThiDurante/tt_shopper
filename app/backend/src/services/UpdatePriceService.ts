import PackServiceI from '../interfaces/Pack/PackServiceI';
import ProductServiceI from '../interfaces/Product/ProductServiceI';
import UpdatePriceResponseI from '../interfaces/updatePrice/UpdatePriceResponseI';
import UpdatePriceServiceI, {
  Data,
} from '../interfaces/updatePrice/UpdatePriceServiceI';

export default class UpdatePriceService implements UpdatePriceServiceI {
  constructor(
    private productService: ProductServiceI,
    private packService: PackServiceI
  ) {}

  async updatePrice(file: Data[]): Promise<UpdatePriceResponseI | string> {
    const products = await this.productService.getAllProducts();
    console.log(products);

    // find which products are in the file
    const productsToUpdate = products.filter((product) => {
      return file.some((data) => +data.product_code === +product.code);
    });
    console.log(productsToUpdate);
    return 'Ainda não implementado';
  }
}
