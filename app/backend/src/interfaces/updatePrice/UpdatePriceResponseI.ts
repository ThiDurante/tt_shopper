export default interface UpdatePriceResponseI {
  codigo: number;
  name: string;
  newPrice: number;
  oldPrice: number;
  updated: boolean;
  error: string;
}
