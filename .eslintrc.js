// eslint-disable-next-line
module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        "@typescript-eslint/no-explicit-any": 0,
        "@typescript-eslint/no-empty-function": 0,
        "@typescript-eslint/explicit-module-boundary-types": 0,
        "@typescript-eslint/ban-types": 0,
        "react/display-name": 0
    }
};
