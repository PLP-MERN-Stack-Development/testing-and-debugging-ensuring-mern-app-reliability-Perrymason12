const { errorHandler, notFoundHandler } = require('../../src/middleware/errorHandler');

const createMockRes = () => {
  const res = {};
  res.statusCode = 200;
  res.status = jest.fn().mockImplementation((code) => {
    res.statusCode = code;
    return res;
  });
  res.json = jest.fn().mockReturnValue(res);
  res.setHeader = jest.fn();
  return res;
};

describe('error handlers', () => {
  it('handles not found routes', () => {
    const res = createMockRes();
    const req = { originalUrl: '/unknown' };
    notFoundHandler(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Resource not found',
      path: '/unknown'
    });
  });

  it('formats unexpected errors', () => {
    const res = createMockRes();
    const req = {};
    const err = new Error('Boom');

    errorHandler(err, req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ error: 'Boom' })
    );
  });
});

