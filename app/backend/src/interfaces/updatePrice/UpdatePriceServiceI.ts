import UpdatePriceResponseI from './UpdatePriceResponseI';

export default interface UpdatePriceServiceI {
  updatePrice(file: File): Promise<UpdatePriceResponseI | string>;
}
