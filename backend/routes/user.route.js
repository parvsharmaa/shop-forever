import express from 'express';
import {
  adminLogin,
  loginUser,
  registerUser,
  getUserCoupon,
} from '../controllers/user.controller.js';
import authUser from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/admin', adminLogin);
userRouter.get('/coupon', authUser, getUserCoupon);

export default userRouter;
