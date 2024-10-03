import express from 'express';
import {
  loginUser,
  registerUser,
  getUserCoupon,
} from '../controllers/user.controller.js';
import { userAuth } from '../middleware/auth.js';

const userRouter = express.Router();

// User Registration
userRouter.post('/register', registerUser);

// User Login
userRouter.post('/login', loginUser);

// Get User Coupon (protected by userAuth middleware)
userRouter.get('/coupon', userAuth, getUserCoupon);

export default userRouter;
