# Testing and Debugging MERN Applications

This assignment focuses on implementing comprehensive testing strategies for a MERN stack application, including unit testing, integration testing, and end-to-end testing, along with debugging techniques.

## What was built

- A small but realistic MERN knowledge base app with secure CRUD endpoints for blog-style posts.
- React front-end with reusable components, a custom data-fetching hook, and Redux-style state slice.
- Robust test suites:
  - **Server**: unit tests for utilities/middleware plus Supertest-powered integration coverage against an in-memory MongoDB instance.
  - **Client**: unit tests for utilities, hooks, Redux logic, and components; integration tests with MSW to simulate API interactions.
  - **End-to-End**: Cypress specs that exercise critical user journeys (listing posts and creating a post).
- Debugging improvements: server-side structured logging, request performance monitoring, centralized error handling, and a React error boundary for graceful UI failures.

## Assignment Overview

You will:
1. Set up testing environments for both client and server
2. Write unit tests for React components and server functions
3. Implement integration tests for API endpoints
4. Create end-to-end tests for critical user flows
5. Apply debugging techniques for common MERN stack issues

## Project Structure

```
mern-testing/
├── client/                 # React front-end
│   ├── src/                # React source code
│   │   ├── components/     # React components
│   │   │   ├── Button.jsx
│   │   │   ├── ErrorBoundary.jsx
│   │   │   └── PostList.jsx
│   │   ├── tests/          # Client-side tests
│   │   │   ├── unit/       # Unit tests
│   │   │   └── integration/ # Integration tests w/ MSW
│   │   └── App.jsx         # Main application component
│   └── cypress/            # End-to-end tests
│       └── e2e/posts.cy.js
├── server/                 # Express.js back-end
│   ├── src/                # Server source code
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   └── middleware/     # Custom middleware
│   └── tests/              # Server-side tests
│       ├── unit/           # Unit tests
│       └── integration/    # Integration tests
├── jest.config.js          # Jest configuration
└── package.json            # Project dependencies
```

## Getting Started

1. Accept the GitHub Classroom assignment invitation
2. Clone your personal repository that was created by GitHub Classroom
3. Follow the setup instructions in the `Week6-Assignment.md` file
4. Explore the starter code and existing tests
5. Complete the tasks outlined in the assignment

## Files Included

- `Week6-Assignment.md`: Detailed assignment instructions
- Starter code for a MERN application with basic test setup:
  - Sample React components with accompanying tests and fixtures
  - Express routes with controllers, middleware, and database models
  - Jest configuration sharing across client/server plus Cypress config
  - Example unit, integration, and e2e tests demonstrating best practices

## Requirements

- Node.js (v18 or higher)
- MongoDB (local installation or Atlas account)
- npm or yarn
- Basic understanding of testing concepts

## Setup & scripts

```bash
# install everything
npm run install-all

# run every test suite (unit + integration + e2e)
npm test

# scoped runs
npm run test:unit
npm run test:integration
npm run test:e2e        # executes the Cypress suite

# individual packages
npm run test --prefix server
npm run test --prefix client
```

## Testing Tools

- Jest: JavaScript testing framework
- React Testing Library: Testing utilities for React
- Supertest: HTTP assertions for API testing
- Cypress/Playwright: End-to-end testing framework
- MongoDB Memory Server: In-memory MongoDB for testing

## Submission

Your work will be automatically submitted when you push to your GitHub Classroom repository. Make sure to:

1. Complete all required tests (unit, integration, and end-to-end)
2. Achieve at least 70% code coverage for unit tests
3. Document your testing strategy in the README.md
4. Include screenshots of your test coverage reports
5. Demonstrate debugging techniques in your code

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library Documentation](https://testing-library.com/docs/react-testing-library/intro/)
- [Supertest Documentation](https://github.com/visionmedia/supertest)
- [Cypress Documentation](https://docs.cypress.io/)
- [MongoDB Testing Best Practices](https://www.mongodb.com/blog/post/mongodb-testing-best-practices) 

## Testing strategy summary

- **Unit tests** guard reusable logic such as `slugify`, JWT helpers, Redux reducers, and the custom `usePosts` hook.
- **Integration tests** validate the full post CRUD workflow against a transient MongoDB instance and ensure React components respond correctly to mocked API data.
- **End-to-end tests** cover the core journey of listing posts and creating a new post, using Cypress network intercepts to keep runs deterministic.
- Coverage thresholds are enforced globally at 70%+ to ensure breadth.

## Debugging techniques in place

- Structured logging (`pino`) with request/response timing metrics to quickly spot problem calls.
- Express global error handler and 404 guard standardize API failure responses.
- React error boundary surfaces client-side issues with a retry affordance.
- Performance middleware adds an `X-Response-Time` header and flags slow requests in the logs.
- Tests rely on MSW and Mongo Memory Server to replicate production issues locally without external dependencies.

> Tip: run `npm run test -- --coverage` to generate HTML coverage reports under `coverage/`. Capture screenshots of the generated coverage dashboards for submission artifacts.