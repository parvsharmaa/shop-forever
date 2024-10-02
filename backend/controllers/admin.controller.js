import Order from '../models/order.model.js';
import User from '../models/user.model.js';

// Admin: Generate coupon for a specific user (manual)
const generateDiscount = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    user.activeCoupon = {
      code: `DISCOUNT10-${Date.now()}`,
      valid: true,
    };

    await user.save();

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

// Admin: List store stats
const storeStats = async (req, res) => {
  try {
    const orders = await Order.find({});
    const totalAmount = orders.reduce((acc, order) => acc + order.amount, 0);
    const totalItems = orders.reduce(
      (acc, order) => acc + order.items.length,
      0
    );
    const discountCodes = await User.find({
      'activeCoupon.code': { $ne: null },
    }).select('activeCoupon');

    res.json({
      success: true,
      totalOrders: orders.length,
      totalItemsPurchased: totalItems,
      totalAmount,
      discountCodes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export { generateDiscount, storeStats };
