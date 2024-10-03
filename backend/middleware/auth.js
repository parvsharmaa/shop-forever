import jwt from 'jsonwebtoken';

/*
  userAuth Middleware:
  - Protects routes by ensuring the user is authenticated.
  - Checks if a valid JWT token is present in the authorization header.
  - Verifies the token and decodes the user's ID, then adds the user ID to the request body.
*/
const userAuth = async (req, res, next) => {
  try {
    // Extract token from authorization header
    const token = req.headers.authorization.split(' ')[1];

    // If no token is provided, return unauthorized
    if (!token) {
      return res.json({ success: false, message: 'Unauthorized' });
    }

    // Verify the token using the JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // If token is invalid, return unauthorized
    if (!decoded) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    // Attach the user ID to the request body for further use in protected routes
    req.body.userId = decoded.id;
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

/*
  adminAuth Middleware:
  - Protects admin-only routes by ensuring the requester is an admin.
  - Verifies the JWT token and checks if the user is the admin by matching the decoded ID.
*/
const adminAuth = async (req, res, next) => {
  try {
    // Extract token from authorization header
    const token = req.headers.authorization.split(' ')[1];

    // If no token is provided, return unauthorized
    if (!token) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // If token is invalid, return unauthorized
    if (!decoded) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    // Check if the decoded user is the admin
    if (decoded.id !== process.env.ADMIN_ID) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ success: false, message: 'Unauthorized' });
  }
};

export { userAuth, adminAuth };
