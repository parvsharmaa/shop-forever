import Order from '../models/order.model.js';
import User from '../models/user.model.js';
import { createToken } from '../services/user.service.js';

/*
  adminLogin:
  - Handles admin login functionality.
  - Validates admin credentials (email and password) from environment variables.
  - Generates and returns a JWT token on successful login.
*/
const adminLogin = (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate admin credentials
    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.json({ success: false, message: 'Invalid credentials' });
    }

    // Generate admin token
    const token = createToken(process.env.ADMIN_ID);

    // Return success response with token
    res.json({
      success: true,
      message: 'Admin logged in successfully',
      token,
    });
  } catch (error) {
    console.error(error);
    // Handle server errors
    res.json({ success: false, message: 'Server error' });
  }
};

/*
  generateDiscount:
  - Allows admin to manually generate a discount coupon for a specific user.
  - Fetches the user and assigns a unique discount code.
*/
const generateDiscount = async (req, res) => {
  try {
    const { userId } = req.body;

    // Fetch user by ID
    const user = await User.findById(userId);

    // Check if the user exists
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    // Assign a discount coupon to the user
    user.activeCoupon = {
      code: `DISCOUNT10-${Date.now()}`, // Unique discount code with a timestamp
      valid: true,
    };

    // Save the user with the new coupon
    await user.save();

    // Return success response with the generated coupon
    res.json({
      success: true,
      message: 'Coupon generated successfully',
      coupon: user.activeCoupon,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

/*
  storeStats:
  - Fetches store-wide statistics for admin.
  - Returns the total number of orders, total items purchased, total revenue,
    and the list of active discount codes.
*/
const storeStats = async (req, res) => {
  try {
    // Fetch all orders
    const orders = await Order.find({});

    // Calculate total amount from all orders
    const totalAmount = orders.reduce((acc, order) => acc + order.amount, 0);

    // Calculate total number of items purchased from all orders
    const totalItems = orders.reduce(
      (acc, order) => acc + order.items.length,
      0
    );

    // Fetch all active discount codes from users
    const discountCodes = await User.find({
      'activeCoupon.code': { $ne: null }, // Only select users with active coupons
    }).select('activeCoupon');

    // Return the calculated store stats
    res.json({
      success: true,
      totalOrders: orders.length,
      totalItemsPurchased: totalItems,
      totalAmount,
      discountCodes, // List of users with active discount codes
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export { adminLogin, generateDiscount, storeStats };
