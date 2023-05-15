import PackI from '../interfaces/Pack/PackI';
import PackServiceI from '../interfaces/Pack/PackServiceI';
import ProductI from '../interfaces/Product/ProductI';
import ProductServiceI from '../interfaces/Product/ProductServiceI';
import UpdatePriceResponseI from '../interfaces/updatePrice/UpdatePriceResponseI';
import UpdatePriceServiceI, {
  Data,
  validationProduct,
} from '../interfaces/updatePrice/UpdatePriceServiceI';

export default class UpdatePriceService implements UpdatePriceServiceI {
  constructor(
    private productService: ProductServiceI,
    private packService: PackServiceI
  ) {}

  async validate(
    file: Data[]
  ): Promise<UpdatePriceResponseI[] | validationProduct[]> {
    const products = await this.productService.getAllProducts();
    // find which products are in the file
    const productsToUpdate = products.filter((product) => {
      return file.some((data) => +data.product_code === +product.code);
    });
    const validatedProducts = await this.validateProducts(
      productsToUpdate,
      file
    );
    return validatedProducts;
  }

  updatePrice = async (
    productsValidated: UpdatePriceResponseI[]
  ): Promise<UpdatePriceResponseI[]> => {
    //checking errors
    const noErrors = productsValidated.every(
      (product) => product.updated === true
    );
    if (noErrors) {
      // update products on db and return success message
      await this.updateProducts(productsValidated);
      await this.updatePacks();
    }
    return productsValidated;
  };

  // calls all the validations and returns an array of products to update
  async validateProducts(
    dbProducts: ProductI[],
    fileProducts: Data[]
  ): Promise<UpdatePriceResponseI[] | validationProduct[]> {
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
    return this.formatResponse(dbProducts, ArrayExistsPriceandCostChecked);
  }
  // checks if fields in file are all valid
  checkIfFieldsAreValid(fileProducts: Data[]): validationProduct[] {
    const fileChecked = fileProducts.map((product) => {
      if (!product.product_code)
        return {
          ...product,
          updated: false,
          error: 'código do produto está faltando, ',
        };
      if (!product.new_price) {
        return {
          ...product,
          updated: false,
          error: 'novo preço está faltando, ',
        };
      }
      if (isNaN(+product.new_price)) {
        return {
          ...product,
          updated: false,
          error: 'novo preço não é um número, ',
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
          product.error += `produto não existe, `;
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
      if (productToUpdate && product.new_price) {
        const currentPrice = +productToUpdate.sales_price;
        const newPrice = +product.new_price;
        const tenPercent = currentPrice * 0.1;
        const tenPercentRange = [
          currentPrice - tenPercent,
          currentPrice + tenPercent,
        ];
        if (newPrice < tenPercentRange[0]) {
          product.updated = false;
          product.error += `aumento maior que 10%, `;
        }
        if (newPrice > tenPercentRange[1]) {
          product.updated = false;
          product.error += `diminuição maior que 10%, `;
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
          fileProduct.error += `preço menor que custo, `;
        }
      }
    });
    return fileProducts;
  }

  async updateProducts(products: validationProduct[]): Promise<string> {
    const updatedProducts = Promise.all(
      products.map(async (product) => {
        if (product.updated) {
          await this.productService.updateProductPrice(
            product.product_code,
            String(Number(product.new_price).toFixed(2))
          );
        }
      })
    );
    await updatedProducts;
    return 'ok';
  }

  async formatResponse(
    dbProducts: ProductI[],
    productsValidated: validationProduct[]
  ) {
    const formattedSuccessProducts = productsValidated.map((product) => {
      const dbProduct = dbProducts.find(
        (dbProduct) => +dbProduct.code === +product.product_code
      );
      if (dbProduct) {
        return {
          ...product,
          oldPrice: String(dbProduct.sales_price),
          name: dbProduct.name,
        };
      }
      // this should never happen just here for typescript
      return { ...product, oldPrice: '', name: '' };
    });
    return formattedSuccessProducts;
  }
  async updatePacks(): Promise<void> {
    // get all packs
    const packs = await this.packService.getAllPacks();
    // recalculates pack price and updates on db
    const updatedPacks: any = [];
    packs.forEach(async (pack: any) => {
      if (updatedPacks.includes(pack.Product.code)) {
        const findPack = updatedPacks.find(
          (updatedPack: any) => updatedPack.Product.code === pack.Product.code
        );
        findPack.packPrice += pack.Product.sales_price * pack.qty;
      }
      const packPrice = pack.Product.sales_price * pack.qty;
      updatedPacks.push({ ...pack, packPrice });
    });
    const updating = Promise.all(
      updatedPacks.map((pack: any) => {
        console.log(pack);

        this.productService.updateProductPrice(pack.pack_id, pack.packPrice);
      })
    );
    await updating;
  }
}
