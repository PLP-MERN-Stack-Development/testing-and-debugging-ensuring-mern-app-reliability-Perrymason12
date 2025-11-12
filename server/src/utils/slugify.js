const slugify = (input) => {
  if (typeof input !== 'string') {
    throw new TypeError('slugify expects a string value');
  }

  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

module.exports = slugify;

