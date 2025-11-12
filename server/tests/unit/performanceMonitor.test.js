const performanceMonitor = require('../../src/middleware/performanceMonitor');

describe('performanceMonitor middleware', () => {
  it('sets response time header on finish', () => {
    const req = { method: 'GET', originalUrl: '/test' };
    const res = {
      once: (event, handler) => {
        if (event === 'finish') {
          handler();
        }
      },
      setHeader: jest.fn()
    };

    const next = jest.fn();
    performanceMonitor(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.setHeader).toHaveBeenCalledWith(
      'X-Response-Time',
      expect.stringMatching(/ms$/)
    );
  });
});

