import Order from '../models/order.model.js';
import User from '../models/user.model.js';
import {
  generateCouponCode,
  validateCoupon,
  N,
} from '../services/coupon.service.js';

const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address, discountCode, discountAmount } =
      req.body;

    const user = await User.findById(userId);

    // Check if the user has placed enough orders to receive a coupon
    const orderCount = await Order.countDocuments({ userId });

    // Apply discount if a valid coupon is provided
    if (discountCode) {
      // if validation succeeded, proceed to logic
      if (validateCoupon(user, discountCode)) {
        // Mark the coupon as used
        user.activeCoupon.valid = false;
        await user.save();
      } else {
        return res.json({
          success: false,
          message: 'Coupon not valid!',
        });
      }
    }

    // Create the order in the database
    const newOrder = new Order({
      userId,
      items,
      amount: amount - discountAmount,
      address,
      date: Date.now(),
      couponCode: discountCode,
      discountAmount,
    });

    // Save the new order
    await newOrder.save();

    // Generate a coupon for the next nth order
    if ((orderCount + 1) % N === 0) {
      user.activeCoupon = {
        code: generateCouponCode(),
        valid: true,
      };
      await user.save();
    }

    // Reset user's cart
    await User.findByIdAndUpdate(userId, { cart: {} });

    res.json({
      success: true,
      message: 'Order placed successfully',
      discountApplied: discountAmount > 0,
      couponGenerated: user.activeCoupon ? user.activeCoupon.code : null,
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Server error' });
  }
};

const allOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Server error' });
  }
};

const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await Order.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {}
};

export { placeOrder, userOrders, allOrders };
