export default interface UpdatePriceResponseI {
  product_code: string;
  name: string;
  new_price: string;
  oldPrice: string;
  updated: boolean;
  error: string;
}

type validationProduct = {
  product_code: string;
  updated: boolean;
  error: string;
  new_price: string;
};
