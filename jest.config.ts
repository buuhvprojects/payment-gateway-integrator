import type { Config } from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
    "roots": ["<rootDir>/__tests__"],
    "clearMocks": true,
    "collectCoverageFrom": ["<rootDir>/app/**/*.ts"],
    "collectCoverage": true,
    "coverageDirectory": "coverage",
    "coverageProvider": "v8",
    "coverageThreshold": {
        "global": {
            "branches": 90,
            "functions": 90,
            "lines": 90,
            "statements": 90
        }
    },
    "transform": {
        ".+\\.ts$": "ts-jest"
    },
    "testRegex": '(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$',
    "setupFiles": [
        "dotenv/config"
    ],
};
export default config;