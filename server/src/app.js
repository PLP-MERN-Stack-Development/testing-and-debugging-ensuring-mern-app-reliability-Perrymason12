const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const routes = require('./routes');
const requestLogger = require('./middleware/requestLogger');
const performanceMonitor = require('./middleware/performanceMonitor');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');
const logger = require('./utils/logger');

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  })
);
app.use(express.json());
app.use(requestLogger);
app.use(performanceMonitor);

app.use(
  morgan('dev', {
    stream: logger.stream,
    skip: () => process.env.NODE_ENV === 'test'
  })
);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() });
});

app.use('/api', routes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;

