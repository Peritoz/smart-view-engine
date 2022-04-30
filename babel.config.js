module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                targets: {
                    node: "current",
                },
            },
        ],
        "@babel/preset-typescript",
    ],
    plugins: [
        [
            "module-resolver",
            {
                root: ["."],
                alias: {
                    "^@libs/(.+)": "./src/libs/\\1",
                },
            },
        ],
    ],
    //ignore: ["**/*.test.ts"],
};