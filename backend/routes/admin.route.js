import express from 'express';
import {
  generateDiscount,
  storeStats,
} from '../controllers/admin.controller.js';
import adminAuth from '../middleware/admin.auth.js';

const router = express.Router();

// Generate discount for user
router.post('/generate-discount', adminAuth, generateDiscount);

// Get store stats
router.get('/stats', adminAuth, storeStats);

export default router;
