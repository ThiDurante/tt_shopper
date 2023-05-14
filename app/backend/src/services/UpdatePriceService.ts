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
    const validatedProducts: validationProduct[] = await this.validateProducts(
      productsToUpdate,
      file
    );

    throw new Error('Method not implemented.');
  }
  // calls all the validations and returns an array of products to update
  async validateProducts(
    dbProducts: ProductI[],
    fileProducts: Data[]
  ): Promise<validationProduct[]> {
    const ArrayChecked = this.checkIfFieldsAreValid(fileProducts);

    const ArrayExistsChecked = await this.checkIfProductsExists(ArrayChecked);
    const ArrayExistsAndPriceChecked = this.checkIfPriceIsIn10PercentRange(
      dbProducts,
      ArrayExistsChecked
    );
    const ArrayExistsPriceandCostChecked = this.checkIfPriceIsBiggerThanCost(
      dbProducts,
      ArrayExistsAndPriceChecked
    );
    console.log(1, ArrayExistsPriceandCostChecked);

    //checking errors
    const noErrors = ArrayExistsPriceandCostChecked.every(
      (product) => product.updated === true
    );
    if (noErrors) {
      // update products on db and return success message
    }
    return ArrayExistsPriceandCostChecked;
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

  // validates if all products exists on DB
  async checkIfProductsExists(
    fileProducts: validationProduct[]
  ): Promise<validationProduct[]> {
    const newFile = Promise.all(
      fileProducts.map(async (product) => {
        const productExists = await this.productService.findByCode(
          product.product_code
        );
        if (!productExists) {
          product.updated = false;
          product.error += `product_code does not exist. `;
        }
      })
    );
    await newFile;
    return fileProducts;
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
        const currentPrice = +productToUpdate.sales_price;
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

  async updateProducts(
    products: validationProduct[]
  ): Promise<UpdatePriceResponseI[]> {
    const updatedProducts: UpdatePriceResponseI[] = [];
    products.forEach(async (product) => {
      if (product.updated) {
        const updatedProduct = await this.productService.updateProductPrice(
          product.product_code,
          product.new_price
        );
      }
    });
    return updatedProducts;
  }
}
