module.exports = {
    roots: ['<rootDir>'],
    clearMocks: true,
    coverageDirectory: "__tests__/coverage",
    coverageProvider: "v8",
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["**/__tests__/**/*.test.ts"],
    moduleNameMapper: {
        "^@libs(.*)$": "<rootDir>/src/libs$1"
    },
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    }
};