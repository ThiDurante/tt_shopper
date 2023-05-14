import UpdatePriceResponseI from './UpdatePriceResponseI';

export type Data = {
  product_code: string;
  new_price: 'string';
};

export default interface UpdatePriceServiceI {
  updatePrice(file: Data[]): Promise<UpdatePriceResponseI | string>;
}
