import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
  try {
    // check if token is provided in header
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    // decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    // check if the decoded user is admin
    if (decoded !== process.env.ADMIN_ID) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ success: false, message: 'Unauthorized' });
  }
};

export default adminAuth;
