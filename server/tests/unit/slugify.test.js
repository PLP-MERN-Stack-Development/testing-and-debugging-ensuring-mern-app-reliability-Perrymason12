const slugify = require('../../src/utils/slugify');

describe('slugify utility', () => {
  it('converts a string to a URL friendly slug', () => {
    expect(slugify('Hello World!')).toBe('hello-world');
  });

  it('removes repeated hyphens', () => {
    expect(slugify('React   Testing')).toBe('react-testing');
  });

  it('throws when provided a non-string', () => {
    expect(() => slugify(null)).toThrow('slugify expects a string value');
  });
});

