import User from '../models/user.model.js';

const addToCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    const user = await User.findById(userId);
    const cart = user.cart;

    if (cart[itemId]) {
      cart[itemId] += 1;
    } else {
      cart[itemId] = 1;
    }

    await User.findByIdAndUpdate(userId, { cart });
    res.json({ success: true, message: 'Added to Cart!' });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Server error' });
  }
};

const updateCart = async (req, res) => {
  try {
    const { userId, itemId, quantity } = req.body;

    const user = await User.findById(userId);
    const cart = user.cart;

    if (cart[itemId]) {
      // if quantity is set to 0, then the item is removed from the cart
      if (quantity === 0) {
        delete cart[itemId];
      } else {
        cart[itemId] = quantity;
      }
    } else {
      return res.json({ success: false, message: 'Item not found in cart' });
    }

    await User.findByIdAndUpdate(userId, { cart });
    res.json({ success: true, message: 'Cart updated!' });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Server error' });
  }
};

const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId);
    const cart = user.cart;

    res.json({ success: true, cart });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Server error' });
  }
};

export { addToCart, updateCart, getUserCart };
