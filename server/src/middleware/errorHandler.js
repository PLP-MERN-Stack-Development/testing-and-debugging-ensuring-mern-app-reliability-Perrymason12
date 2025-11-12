const logger = require('../utils/logger');

const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    error: 'Resource not found',
    path: req.originalUrl
  });
};

const errorHandler = (err, req, res, next) => {
  logger.error(
    {
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
    },
    'Unhandled server error'
  );

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    error: err.message || 'Internal server error',
    details:
      process.env.NODE_ENV === 'production' ? undefined : err.details || err.stack
  });
};

module.exports = {
  notFoundHandler,
  errorHandler
};

