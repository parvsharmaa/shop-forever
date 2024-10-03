import User from '../models/user.model.js';
import validator from 'validator';
import bcrypt from 'bcrypt';
import { createToken } from '../services/user.service.js';

/*
  registerUser:
  - Handles user registration.
  - Validates email and password.
  - Hashes the password before saving to the database.
  - Generates and returns a JWT token upon successful registration.
*/
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.json({ success: false, message: 'User already exists' });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: 'Invalid email' });
    }

    // Ensure password length is at least 8 characters
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters long',
      });
    }

    // Hash the password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save the new user in the database
    const newUser = new User({ name, email, password: hashedPassword });
    const user = await newUser.save();

    // Generate a JWT token for the user
    const token = createToken(user._id);

    // Respond with success and token
    res.json({ success: true, message: 'User registered successfully', token });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Server error' });
  }
};

/*
  loginUser:
  - Handles user login.
  - Validates the user's email and password.
  - Generates and returns a JWT token upon successful login.
*/
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    // Validate the provided password against the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: 'Invalid credentials' });
    }

    // Generate a JWT token for the user
    const token = createToken(user._id);

    // Respond with success and token
    res.json({ success: true, message: 'User logged in successfully', token });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Server error' });
  }
};

/*
  getUserCoupon:
  - Fetches the valid active coupon for the user.
*/
const getUserCoupon = async (req, res) => {
  try {
    const { userId } = req.body;

    // Find the user by their ID
    const user = await User.findById(userId);

    // Check if there is a valid active coupon
    const coupon =
      user.activeCoupon && user.activeCoupon.valid && user.activeCoupon.code;

    if (!coupon) {
      return res.json({ success: false, message: 'No coupon available!' });
    }

    // Return the valid coupon
    res.json({ success: true, coupon });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Server error' });
  }
};

export { loginUser, registerUser, getUserCoupon };
