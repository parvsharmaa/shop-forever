import express from 'express';
import {
  adminLogin,
  generateDiscount,
  storeStats,
} from '../controllers/admin.controller.js';
import { adminAuth } from '../middleware/auth.js';

const adminRouter = express.Router();

// Admin Login route (no authentication required)
adminRouter.post('/login', adminLogin);

// Generate discount for a user (admin authentication required)
adminRouter.post('/generate-discount', adminAuth, generateDiscount);

// Get store stats (admin authentication required)
adminRouter.get('/stats', adminAuth, storeStats);

export default adminRouter;
