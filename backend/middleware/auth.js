import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
  try {
    // check if token is provided in header
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.json({ success: false, message: 'Unauthorized' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    req.body.userId = decoded.id;
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export default authUser;
