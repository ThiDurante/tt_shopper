import PackServiceI from '../interfaces/Pack/PackServiceI';
import ProductServiceI from '../interfaces/Product/ProductServiceI';
import UpdatePriceResponseI from '../interfaces/updatePrice/UpdatePriceResponseI';
import UpdatePriceServiceI from '../interfaces/updatePrice/UpdatePriceServiceI';

export default class UpdatePriceService implements UpdatePriceServiceI {
  constructor(
    private productService: ProductServiceI,
    private packService: PackServiceI
  ) {}

  async updatePrice(file: File): Promise<UpdatePriceResponseI | string> {
    console.log(file);

    return 'Ainda nõa implementado';
  }
}
