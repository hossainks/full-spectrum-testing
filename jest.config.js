module.exports = {
    testEnvironment: 'node',
    testMatch: [
        "**/tests/**/*.spec.js",
        "**/tests/**/*.test.js"
    ],

    // Coverage configuration
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['text-summary', 'text', 'html'],

    // ignore all Playwright tests
    testPathIgnorePatterns: [
        "/node_modules/",
        "/test-e2e/"
    ],

    // Reporters configuration
    reporters: [
        'default',
        ['jest-junit', {
            outputDirectory: './reports',
            outputName: 'junit.xml'
        }]
    ],
};
