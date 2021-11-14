module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['packages/'],
  collectCoverageFrom: ['packages/**/src/**/{!(*.d.ts),}.ts'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
