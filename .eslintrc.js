module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module" // to support ImportDeclaration
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended"
  ],
  overrides: [
    {
      // enable the rule specifically for TypeScript files
      files: ["*.ts", "*.tsx"],
      rules: {
        "@typescript-eslint/explicit-function-return-type": ["off"],
        "react/prop-types": ["off"]
      }
    }
  ],
  settings: {
    react: {
      // from: https://github.com/yannickcr/eslint-plugin-react#configuration
      version: "detect"
    }
  }
};
