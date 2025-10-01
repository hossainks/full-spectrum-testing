module.exports = {
    testEnvironment: 'node',
    testMatch: [
        "**/tests/unit/**/*.spec.js",
        "**/tests/unit/**/*.test.js",
        "**/tests/integration/**/*.spec.js",
        "**/tests/integration/**/*.test.js"
    ],

    // Coverage configuration
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['text-summary', 'text', 'html'],

    // Reporters configuration
    reporters: [
        'default',
        ['jest-junit', {
            outputDirectory: './reports',
            outputName: 'junit.xml'
        }]
    ],
};
