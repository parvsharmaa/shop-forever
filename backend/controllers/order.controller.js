import Order from '../models/order.model.js';
import User from '../models/user.model.js';

const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    // create order in the database
    const newOrder = new Order({
      userId,
      items,
      amount,
      address,
      date: Date.now(),
    });

    // place order and reset user cart
    await newOrder.save();
    await User.findByIdAndUpdate(userId, { cart: {} });

    res.json({ success: true, message: 'Order placed successfully' });
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
