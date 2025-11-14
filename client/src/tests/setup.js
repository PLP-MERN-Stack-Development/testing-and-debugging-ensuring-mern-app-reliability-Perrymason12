require('@testing-library/jest-dom');
require('whatwg-fetch');

const { server } = require('./mswServer');

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

