import type { InitialOptionsTsJest } from 'ts-jest';
import type { Config } from '@jest/types';

// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

const config: InitialOptionsTsJest & Config.InitialOptions = {
  globals: { 'ts-jest': { tsconfig: './tsconfig-jest.json' } },

  // Jest finds two package.json files for @scope/ladle-218-reproduction without this config option.
  modulePathIgnorePatterns: ['<rootDir>/@scope/ladle-218-reproduction/dist'],

  // A preset that is used as a base for Jest's configuration
  preset: 'ts-jest',

  roots: ['<rootDir>'],

  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  setupFilesAfterEnv: ['./test/setup.js'],

  // The test environment that will be used for testing
  testEnvironment: 'jsdom',

  // The glob patterns Jest uses to detect test files
  // examples: "**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"
  testMatch: ['**/*.test.js', '**/*.test.ts', '**/*.test.tsx'],

  testPathIgnorePatterns: ['/dist/'],

  testTimeout: 30000,

  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { configFile: './babel.jest.js' }],
    '^.+\\.(js|jsx)$': ['babel-jest', { configFile: './babel.jest.js' }],
  },
};
export default config;
