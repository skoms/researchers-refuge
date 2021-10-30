import '@testing-library/jest-dom';
import 'jest-prop-type-error';
import { server } from './mocks/server';


// Establish API mocking before all tests
beforeAll(() => server.listen({
  onUnhandledRequest(req) {
    console.error(
      'Found an unhandled %s request to %s',
      req.method,
      req.url.href,
    )
  },
}));

// Reset request handlers between tests
afterEach(() => {
  server.resetHandlers();
  jest.clearAllMocks();
});

// Clean up after tests
afterAll(() => server.close());