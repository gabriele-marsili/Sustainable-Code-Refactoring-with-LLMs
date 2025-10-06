module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  
  // Pattern per trovare i test
  testMatch: [
    '**/*.test.ts',
    '**/*.test.js',
    '**/*testSuite.ts',
    '**/*testSuite.js',
    '**/*_test.ts',
    '**/*_test.js'
  ],
  
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.json',
      isolatedModules: true,
      compilerOptions: {
        module: 'commonjs',
      }
    },
  },

  moduleNameMapper: {
    '^(.+)\\.js$': '$1',
  },

  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  
  // Ignora node_modules
  testPathIgnorePatterns: ['/node_modules/'],
};