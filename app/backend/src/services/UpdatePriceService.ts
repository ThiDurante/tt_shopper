import PackServiceI from '../interfaces/Pack/PackServiceI';
import ProductI from '../interfaces/Product/ProductI';
import ProductServiceI from '../interfaces/Product/ProductServiceI';
import UpdatePriceResponseI from '../interfaces/updatePrice/UpdatePriceResponseI';
import UpdatePriceServiceI, {
  Data,
} from '../interfaces/updatePrice/UpdatePriceServiceI';

type validationProduct = {
  product_code: string;
  updated: boolean;
  error: string;
  new_price: string;
};

export default class UpdatePriceService implements UpdatePriceServiceI {
  constructor(
    private productService: ProductServiceI,
    private packService: PackServiceI
  ) {}

  async updatePrice(file: Data[]): Promise<UpdatePriceResponseI | string> {
    const products = await this.productService.getAllProducts();
    // find which products are in the file
    const productsToUpdate = products.filter((product) => {
      return file.some((data) => +data.product_code === +product.code);
    });
    const validatedProducts: validationProduct[] = this.validateProducts(
      productsToUpdate,
      file
    );

    throw new Error('Method not implemented.');
  }
  // calls all the validations and returns an array of products to update
  validateProducts(
    dbProducts: ProductI[],
    fileProducts: Data[]
  ): validationProduct[] {
    const validArray = this.checkIfFieldsAreValid(fileProducts);
    const validArrayAndPrice = this.checkIfPriceIsIn10PercentRange(
      dbProducts,
      validArray
    );
    const validArrayPriceAndCost = this.checkIfPriceIsBiggerThanCost(
      dbProducts,
      validArrayAndPrice
    );
    console.log(validArrayPriceAndCost);

    return validArrayPriceAndCost;
  }
  // checks if fields in file are all valid
  checkIfFieldsAreValid(fileProducts: Data[]): validationProduct[] {
    const fileChecked = fileProducts.map((product) => {
      if (!product.product_code)
        return {
          ...product,
          updated: false,
          error: 'product_code is missing. ',
        };
      if (!product.new_price) {
        return { ...product, updated: false, error: 'new_price is missing. ' };
      }
      if (isNaN(+product.new_price)) {
        return {
          ...product,
          updated: false,
          error: 'new_price is not a number. ',
        };
      }
      return { ...product, updated: true, error: '' };
    });
    return fileChecked;
  }

  checkIfPriceIsIn10PercentRange(
    dbProducts: ProductI[],
    fileProducts: validationProduct[]
  ): validationProduct[] {
    fileProducts.forEach((product) => {
      const productToUpdate = dbProducts.find(
        (dbProduct) => +dbProduct.code === +product.product_code
      );
      //check if price is over or under 10% of current price
      if (productToUpdate) {
        const currentPrice = +productToUpdate.cost_price;
        const newPrice = +product.new_price;
        const tenPercent = currentPrice * 0.1;
        const tenPercentRange = [
          currentPrice - tenPercent,
          currentPrice + tenPercent,
        ];
        if (newPrice < tenPercentRange[0]) {
          product.updated = false;
          product.error += `more than 10% discount. `;
        }
        if (newPrice > tenPercentRange[1]) {
          product.updated = false;
          product.error += `more than 10% increse. `;
        }
      }
    });
    return fileProducts;
  }

  checkIfPriceIsBiggerThanCost(
    dbProducts: ProductI[],
    fileProducts: validationProduct[]
  ): validationProduct[] {
    fileProducts.forEach((fileProduct) => {
      const productToUpdate = dbProducts.find(
        (dbProduct) => +dbProduct.code === +fileProduct.product_code
      );
      // check if prie is bigger than cost
      if (productToUpdate) {
        const costPrice = +productToUpdate.cost_price;
        const newPrice = +fileProduct.new_price;
        if (newPrice < costPrice) {
          fileProduct.updated = false;
          fileProduct.error += `price is lower than cost. `;
        }
      }
    });
    return fileProducts;
  }
}
