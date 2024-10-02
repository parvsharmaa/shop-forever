import express from 'express';
import {
  placeOrder,
  userOrders,
  allOrders,
} from '../controllers/order.controller.js';
import adminAuth from '../middleware/admin.auth.js';
import authUser from '../middleware/auth.js';

const orderRouter = express.Router();

// admin
orderRouter.post('/list', adminAuth, allOrders);

// user
orderRouter.post('/place', authUser, placeOrder);
orderRouter.get('/userorders', authUser, userOrders);

export default orderRouter;
