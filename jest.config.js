module.exports = {
    testEnvironment: 'node',
    testMatch: ['**/tests/**/*.spec.js'],
    
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
