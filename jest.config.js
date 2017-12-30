module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.js'],
  coveragePathIgnorePatterns: ['index.js'],
  globalSetup: './tests/setup.js',
  globalTeardown: './tests/teardown.js',
  testEnvironment: './tests/puppeteer_environment.js',
};
