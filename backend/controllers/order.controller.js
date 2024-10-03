import Order from '../models/order.model.js';
import User from '../models/user.model.js';
import {
  generateCouponCode,
  validateCoupon,
  N,
} from '../services/coupon.service.js';

/*
  placeOrder:
  - Handles order placement for a user.
  - Validates and applies discount coupons if provided.
  - Generates new coupons when applicable (every Nth order).
  - Resets user's cart after successful order placement.
*/
const placeOrder = async (req, res) => {
  try {
    // Destructure request body parameters
    const { userId, items, amount, address, discountCode, discountAmount } =
      req.body;

    // Fetch user data based on userId
    const user = await User.findById(userId);

    // Get the total number of orders placed by the user
    const orderCount = await Order.countDocuments({ userId });

    // If a discount code is provided, validate it
    if (discountCode) {
      // Validate the provided coupon
      if (validateCoupon(user, discountCode)) {
        // If the coupon is valid, mark it as used
        user.activeCoupon.valid = false;
        await user.save();
      } else {
        // Return a failure response if the coupon is not valid
        return res.json({
          success: false,
          message: 'Coupon not valid!',
        });
      }
    }

    // Create a new order object and calculate the final amount after discount
    const newOrder = new Order({
      userId,
      items,
      amount: amount - discountAmount, // Subtract discount amount
      address,
      date: Date.now(),
      couponCode: discountCode,
      discountAmount,
    });

    // Save the new order to the database
    await newOrder.save();

    // Generate a new coupon for the user after every Nth order
    if ((orderCount + 1) % N === 0) {
      // Generate a new coupon code and assign it to the user
      user.activeCoupon = {
        code: generateCouponCode(),
        valid: true,
      };
      await user.save();
    }

    // Clear the user's cart after order placement
    await User.findByIdAndUpdate(userId, { cart: {} });

    // Send a success response including details of coupon generation
    res.json({
      success: true,
      message: 'Order placed successfully',
      discountApplied: discountAmount > 0, // Indicate whether a discount was applied
      couponGenerated: user.activeCoupon ? user.activeCoupon.code : null, // Return new coupon if generated
    });
  } catch (error) {
    console.error(error);
    // Handle server errors
    res.json({ success: false, message: 'Server error' });
  }
};

/*
  userOrders:
  - Fetches all orders placed by a specific user.
*/
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    // Fetch all orders related to the specific user
    const orders = await Order.find({ userId });

    // Send the user's orders in the response
    res.json({ success: true, orders });
  } catch (error) {
    console.error(error);
    // Handle server errors
    res.json({ success: false, message: 'Server error' });
  }
};

export { placeOrder, userOrders };
