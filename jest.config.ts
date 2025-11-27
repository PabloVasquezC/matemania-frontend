import type {Config} from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@styles/(.*)$': '<rootDir>/src/styles/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@assets/(.*)$': '<rootDir>/src/assets/$1',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@types/(.*)$': '<rootDir>/src/types/$1',
    '^@constants/(.*)$': '<rootDir>/src/constants/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^types/(.*)$': '<rootDir>/src/types/$1',
  },
  roots: ['<rootDir>'],
  moduleDirectories: ['node_modules', 'src'],
  testPathIgnorePatterns: ['<rootDir>/tests/e2e', '<rootDir>/node_modules/'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: 'tsconfig.app.json',
      diagnostics: {
        ignoreCodes: [151001],
      },
    }],
  },
};

export default config;
