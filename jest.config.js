module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testEnvironment: 'node',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  testPathIgnorePatterns: ['/dist/', '/node_modules/'],
  testTimeout: 30 * 1000,
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: true,
  reporters: [
    'default', [
      'jest-junit', {
        suiteName: 'jest tests',
        outputDirectory: './reports/junit/',
        classNameTemplate: '{filename}',
      },
    ],
  ],
};
