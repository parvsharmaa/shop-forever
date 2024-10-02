import express from 'express';
import {
  listProduct,
  addProduct,
  singleProduct,
  removeProduct,
} from '../controllers/product.controller.js';

const productRouter = express.Router();

productRouter.get('/list', listProduct);
productRouter.post('/add', addProduct);
productRouter.post('/single', singleProduct);
productRouter.post('/remove', removeProduct);

export default productRouter;
