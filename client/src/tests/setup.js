import '@testing-library/jest-dom';
import 'whatwg-fetch';
import { server } from './mswServer';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

