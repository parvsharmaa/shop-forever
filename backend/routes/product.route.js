import express from 'express';
import {
  listProduct,
  addProduct,
  singleProduct,
  removeProduct,
} from '../controllers/product.controller.js';
import adminAuth from '../middleware/admin.auth.js';

const productRouter = express.Router();

productRouter.get('/list', listProduct);
productRouter.post('/add', adminAuth, addProduct);
productRouter.post('/single', singleProduct);
productRouter.post('/remove', adminAuth, removeProduct);

export default productRouter;
