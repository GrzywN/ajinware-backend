/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+.tsx?$': ['ts-jest', {}],
  },
  globalSetup: './setup.ts',
  globalTeardown: './teardown.ts',
  bail: 1,
  rootDir: './test',
};
