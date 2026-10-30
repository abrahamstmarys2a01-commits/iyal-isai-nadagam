const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const { Store, isMongoLive } = require('../data/store');

const adminStore = new Store('admins', []);

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route. Token missing.'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'kalamanram_super_secret_jwt_key_2026_tamil_arts');

    if (isMongoLive()) {
      req.admin = await Admin.findById(decoded.id).select('-password');
    } else {
      req.admin = adminStore.findById(decoded.id);
    }

    if (!req.admin) {
      return res.status(401).json({
        success: false,
        message: 'Admin account not found with this token.'
      });
    }

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Token verification failed or expired.'
    });
  }
};
