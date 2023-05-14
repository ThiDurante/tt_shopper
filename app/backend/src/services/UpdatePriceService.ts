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
    console.log(validatedProducts);

    throw new Error('Method not implemented.');
  }
  // calls all the validations and returns an array of products to update
  validateProducts(
    dbProducts: ProductI[],
    fileProducts: Data[]
  ): validationProduct[] {
    const validArray = this.checkIfFieldsAreValid(fileProducts);
    return validArray;
  }
  // checks if fields in file are all valid
  checkIfFieldsAreValid(fileProducts: Data[]): validationProduct[] {
    const productsChecked = fileProducts.map((product) => {
      if (!product.product_code)
        return { ...product, updated: false, error: 'product_code is missing' };
      if (!product.new_price) {
        return { ...product, updated: false, error: 'new_price is missing' };
      }
      return { ...product, updated: true, error: '' };
    });
    return productsChecked;
  }

  // checkIfPriceIsIn10PercentRange(
  //   productsToUpdate: ProductI[],
  //   file: Data[]
  // ): boolean {
  //   let result: UpdatePriceServiceI[] = [];
  //   productsToUpdate.forEach((product) => {
  //     const fileDataForProduct = file.find(
  //       (data) => +data.product_code === +product.code
  //     );
  //     if (fileDataForProduct) {
  //       console.log('fileDataForProduct', fileDataForProduct.new_price);
  //       console.log('product.sales_price', product.sales_price);

  //       const priceIn10PercentRange =
  //         +fileDataForProduct.new_price >= +product.sales_price * 0.9 &&
  //         +fileDataForProduct.new_price <= +product.sales_price * 1.1;
  //       if (priceIn10PercentRange) {
  //         priceCheckedProduct = {
  //           ...fileDataForProduct,
  //           updated: true,
  //           error: '',
  //         };
  //       }
  //     }
  //   });
  //   return result;
  // }
}
