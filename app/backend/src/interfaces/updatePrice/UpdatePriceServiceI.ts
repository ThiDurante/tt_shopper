import UpdatePriceResponseI from './UpdatePriceResponseI';

export type Data = {
  product_code: string;
  new_price: 'string';
};

export type validationProduct = {
  product_code: string;
  updated: boolean;
  error: string;
  new_price: string;
};

export default interface UpdatePriceServiceI {
  validate(file: Data[]): Promise<UpdatePriceResponseI[] | validationProduct[]>;
  updatePrice(
    productsValidated: UpdatePriceResponseI[]
  ): Promise<UpdatePriceResponseI[]>;
}
