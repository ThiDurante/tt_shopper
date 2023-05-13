import { Router } from 'express';
import ProductController from '../controllers/ProductController';
import ProductService from '../services/ProductService';
import ProductModel from '../models/ProductModel';

const productsRouter = Router();

const productModel = new ProductModel();
const productService = new ProductService(productModel);
const productController = new ProductController(productService);

productsRouter.get(
  '/products',
  productController.getAllProducts.bind(productController)
);

export default productsRouter;
