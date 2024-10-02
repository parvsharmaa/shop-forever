import User from '../models/user.model.js';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// User Registration
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    console.log(userExists);
    if (userExists) {
      return res.json({ success: false, message: 'User already exists' });
    }

    // validate email & password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: 'Invalid email' });
    }
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters long',
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // save user to database
    const newUser = new User({ name, email, password: hashedPassword });
    const user = await newUser.save();

    // generate and send jwt token to client
    const token = createToken(user._id);

    res.json({ success: true, message: 'User registered successfully', token });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Server error' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    // validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: 'Invalid credentials' });
    }

    // generate and send jwt token to client
    const token = createToken(user._id);

    res.json({ success: true, message: 'User logged in successfully', token });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Server error' });
  }
};

const adminLogin = (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.json({ success: false, message: 'Invalid credentials' });
    }
    const token = createToken(process.env.ADMIN_ID);
    res.json({ success: true, message: 'Admin logged in successfully', token });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Server error' });
  }
};
export { loginUser, registerUser, adminLogin };
