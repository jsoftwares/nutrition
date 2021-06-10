module.exports = {
    globals: {
        "ts-jest": {
            "tsConfig": "tsconfig.json"
        }
    },
    moduleFileExtensions: ["ts", "js"],
    transform: {
        "^.+\\.ts$": "ts-jest"
    },
    testMatch: [
        "**/*.spec.ts"
    ],
    testEnvironment: "node"
};