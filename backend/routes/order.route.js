import express from 'express';
import { placeOrder, userOrders } from '../controllers/order.controller.js';
import { userAuth } from '../middleware/auth.js';

const orderRouter = express.Router();

// Place an order (protected by userAuth middleware)
orderRouter.post('/place', userAuth, placeOrder);

// Fetch user orders (protected by userAuth middleware)
orderRouter.get('/userorders', userAuth, userOrders);

export default orderRouter;
