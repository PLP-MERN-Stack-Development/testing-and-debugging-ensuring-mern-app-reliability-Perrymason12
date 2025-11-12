const logger = require('../utils/logger');

const performanceMonitor = (req, res, next) => {
  const start = process.hrtime.bigint();

  res.once('finish', () => {
    const elapsedMs = Number(process.hrtime.bigint() - start) / 1_000_000;
    res.setHeader('X-Response-Time', `${elapsedMs.toFixed(2)}ms`);

    if (elapsedMs > 500) {
      logger.warn(
        { method: req.method, path: req.originalUrl, elapsedMs },
        'Slow request detected'
      );
    }
  });

  next();
};

module.exports = performanceMonitor;

