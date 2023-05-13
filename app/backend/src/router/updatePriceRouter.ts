import { Router } from 'express';
import UpdatePriceController from '../controllers/UpdatePriceController';
import UpdatePriceService from '../services/UpdatePriceService';
import PackService from '../services/PackService';
import ProductService from '../services/ProductService';
import PackModel from '../models/PackModel';
import ProductModel from '../models/ProductModel';

const updatePriceRouter = Router();

const productModel = new ProductModel();
const packModel = new PackModel();

const productService = new ProductService(productModel);
const packService = new PackService(packModel);

const updatePriceService = new UpdatePriceService(productService, packService);
const updatePriceController = new UpdatePriceController(updatePriceService);

updatePriceRouter.post(
  '/updatePrice',
  updatePriceController.updatePrice.bind(updatePriceController)
);

export default updatePriceRouter;
