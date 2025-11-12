require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');
const logger = require('./utils/logger');

const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mern-testing-app';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    logger.info('Connected to MongoDB');

    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    logger.error({ error }, 'Failed to connect to MongoDB');
    process.exit(1);
  });

