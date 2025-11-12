const jwt = require('jsonwebtoken');
const { generateToken, verifyToken } = require('../../src/utils/auth');

describe('auth utilities', () => {
  const user = {
    _id: '507f1f77bcf86cd799439011',
    email: 'test@example.com',
    username: 'tester'
  };

  it('generates a signed JWT', () => {
    const token = generateToken(user);
    const decoded = jwt.decode(token);
    expect(decoded.sub).toBe(user._id);
  });

  it('verifies a valid token', () => {
    const token = generateToken(user);
    const decoded = verifyToken(token);
    expect(decoded.email).toBe(user.email);
  });

  it('throws when token is invalid', () => {
    expect(() => verifyToken('invalid.token.value')).toThrow();
  });
});

