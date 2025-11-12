const jwt = require('jsonwebtoken');
const logger = require('./logger');

const JWT_SECRET = process.env.JWT_SECRET || 'local-dev-secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

const generateToken = (user) => {
  if (!user || !user._id) {
    throw new Error('Cannot generate token without a valid user');
  }

  const payload = {
    sub: user._id.toString(),
    email: user.email,
    username: user.username
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    logger.warn({ error }, 'Failed to verify token');
    throw error;
  }
};

const getTokenFromRequest = (req) => {
  const authHeader = req.headers.authorization || '';
  const [, token] = authHeader.split(' ');
  return token;
};

module.exports = {
  generateToken,
  verifyToken,
  getTokenFromRequest
};

