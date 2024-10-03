import User from '../models/user.model.js';

/*
  addToCart:
  - Adds an item to the user's cart.
  - If the item already exists in the cart, increments the quantity by 1.
  - If the item does not exist in the cart, adds it with a quantity of 1.
*/
const addToCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    // Fetch user and their current cart
    const user = await User.findById(userId);
    const cart = user.cart;

    // If item already exists in the cart, increment the quantity
    if (cart[itemId]) {
      cart[itemId] += 1;
    } else {
      // If item doesn't exist in the cart, add it with quantity 1
      cart[itemId] = 1;
    }

    // Update user's cart in the database
    await User.findByIdAndUpdate(userId, { cart });

    // Send success response
    res.json({ success: true, message: 'Added to Cart!' });
  } catch (error) {
    console.error(error);
    // Handle server errors
    res.json({ success: false, message: 'Server error' });
  }
};

/*
  updateCart:
  - Updates the quantity of an item in the user's cart.
  - If quantity is set to 0, the item is removed from the cart.
  - Sends error response if the item is not found in the cart.
*/
const updateCart = async (req, res) => {
  try {
    const { userId, itemId, quantity } = req.body;

    // Fetch user and their current cart
    const user = await User.findById(userId);
    const cart = user.cart;

    // Check if the item exists in the cart
    if (cart[itemId]) {
      // If quantity is 0, remove the item from the cart
      if (quantity === 0) {
        delete cart[itemId];
      } else {
        // Otherwise, update the item's quantity
        cart[itemId] = quantity;
      }
    } else {
      // Send error response if item not found in cart
      return res.json({ success: false, message: 'Item not found in cart' });
    }

    // Update user's cart in the database
    await User.findByIdAndUpdate(userId, { cart });

    // Send success response
    res.json({ success: true, message: 'Cart updated!' });
  } catch (error) {
    console.error(error);
    // Handle server errors
    res.json({ success: false, message: 'Server error' });
  }
};

/*
  getUserCart:
  - Retrieves the cart details for a specific user.
  - Returns the current state of the user's cart.
*/
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;

    // Fetch user and their current cart
    const user = await User.findById(userId);
    const cart = user.cart;

    // Send the cart data as a response
    res.json({ success: true, cart });
  } catch (error) {
    console.error(error);
    // Handle server errors
    res.json({ success: false, message: 'Server error' });
  }
};

export { addToCart, updateCart, getUserCart };
