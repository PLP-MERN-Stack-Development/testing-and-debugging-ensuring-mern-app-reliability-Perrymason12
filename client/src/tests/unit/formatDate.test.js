import formatDate from '../../utils/formatDate';

describe('formatDate utility', () => {
  it('formats ISO strings', () => {
    expect(formatDate('2024-02-01T00:00:00Z')).toBe('Feb 1, 2024');
  });

  it('formats Date instances', () => {
    const date = new Date('2024-03-05T12:00:00Z');
    expect(formatDate(date)).toBe('Mar 5, 2024');
  });

  it('returns empty string for falsy values', () => {
    expect(formatDate('')).toBe('');
    expect(formatDate(null)).toBe('');
  });

  it('throws for invalid input', () => {
    expect(() => formatDate('invalid date')).toThrow('Invalid date supplied');
  });
});

