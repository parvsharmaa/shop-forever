import express from 'express';
import {
  listProduct,
  addProduct,
  singleProduct,
  removeProduct,
} from '../controllers/product.controller.js';
import { adminAuth } from '../middleware/auth.js';

const productRouter = express.Router();

// List all products
productRouter.get('/list', listProduct);

// Add a new product (protected by adminAuth middleware)
productRouter.post('/add', adminAuth, addProduct);

// Fetch a single product by ID
productRouter.post('/single', singleProduct);

// Remove a product (protected by adminAuth middleware)
productRouter.post('/remove', adminAuth, removeProduct);

export default productRouter;
