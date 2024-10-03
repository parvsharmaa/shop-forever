import express from 'express';
import {
  addToCart,
  updateCart,
  getUserCart,
} from '../controllers/cart.contoller.js';
import { userAuth } from '../middleware/auth.js';

const cartRouter = express.Router();

// Add item to cart (protected by userAuth middleware)
cartRouter.post('/add', userAuth, addToCart);

// Get user cart (protected by userAuth middleware)
cartRouter.post('/get', userAuth, getUserCart);

// Update user cart (protected by userAuth middleware)
cartRouter.post('/update', userAuth, updateCart);

export default cartRouter;
