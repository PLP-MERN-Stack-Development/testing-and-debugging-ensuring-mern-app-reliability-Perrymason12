jest.mock('../../src/utils/logger', () => ({
  info: jest.fn()
}));

const requestLogger = require('../../src/middleware/requestLogger');
const logger = require('../../src/utils/logger');

describe('requestLogger middleware', () => {
  it('logs request information after response finishes', () => {
    const req = { method: 'GET', originalUrl: '/posts' };
    const res = {
      statusCode: 200,
      on: (event, handler) => {
        if (event === 'finish') {
          handler();
        }
      }
    };

    const next = jest.fn();
    requestLogger(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(logger.info).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'GET',
        url: '/posts',
        status: 200
      })
    );
  });
});

