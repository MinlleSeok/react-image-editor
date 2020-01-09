module.exports = {
    preset: "jest-puppeteer",   // base of jest configuration
    testMatch: ["**/?(*.)+(spec|test).[t]s"],   // picks test file with pattern
    moduleNameMapper: { // converts module name
        "^src(.*)$": "<rootDir>/src$1",
    },
    transform: {    // pre-processor setting
        "^.+\\.ts?$": "ts-jest",
        "^.+\\.tsx?$": "ts-jest",
        "\\.js$": "ts-jest"
    },
    globalSetup: "./src/test/setup.ts", // pre-setup
    globalTeardown: "./src/test/teardown.ts"    // after-teardown
};