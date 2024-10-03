import jwt from 'jsonwebtoken';

// Function to create a JWT token
const createToken = (id) => {
  // Signs token with user ID and a secret key
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

export { createToken };
