const authMiddleware = require('../../src/middleware/auth');
const authUtils = require('../../src/utils/auth');

jest.mock('../../src/utils/auth', () => ({
  getTokenFromRequest: jest.fn(),
  verifyToken: jest.fn()
}));

describe('auth middleware', () => {
  const next = jest.fn();
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    next.mockClear();
  });

  it('returns 401 when no token is present', () => {
    authUtils.getTokenFromRequest.mockReturnValue(null);

    authMiddleware({}, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it('attaches the user to the request when the token is valid', () => {
    const req = {};
    authUtils.getTokenFromRequest.mockReturnValue('token');
    authUtils.verifyToken.mockReturnValue({ sub: '123' });

    authMiddleware(req, res, next);

    expect(req.user).toEqual({ sub: '123' });
    expect(next).toHaveBeenCalled();
  });
});

