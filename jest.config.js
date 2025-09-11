module.exports = {
    testEnvironment: 'node',
    testMatch: ['**/tests/**/*.spec.js'],
    collectCoverage: true,
    coverageDirectory: 'coverage',
    reporters: [
        'default',
        ['jest-junit', {
            outputDirectory: './reports',
            outputName: 'junit.xml'
        }]
    ],
};
