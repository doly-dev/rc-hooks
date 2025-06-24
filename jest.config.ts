export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  // transform: {
  //   '^.+.tsx?$': ['ts-jest', {}]
  // }
  moduleNameMapper: {
    '^rc-hooks$': '<rootDir>/src/index.ts'
  }
};
