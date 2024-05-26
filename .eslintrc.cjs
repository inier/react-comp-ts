const { getESLintConfig } = require("@applint/spec");

module.exports = getESLintConfig(
  "react-ts",
  {
    rules: {
      "@typescript-eslint/quotes": ["error", "double"],
    },
  },
);
