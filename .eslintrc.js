module.exports = {
  parser: 'babel-eslint',
  env: { browser: true, es6: true, 'jest/globals': true },
  extends: ['eslint:recommended'],
  plugins: ['jest'],
  rules: {
    'no-console': 0,
  },
  globals: {
    module: true,
    global: true,
  },
};
