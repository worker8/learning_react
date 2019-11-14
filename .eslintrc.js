module.exports = {
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "sourceType": "module" // to support ImportDeclaration
    },
    "plugins": [
        "@typescript-eslint",
    ],
    "extends": [
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ]
}