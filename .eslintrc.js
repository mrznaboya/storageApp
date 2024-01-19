module.exports = {
  root: true,
  extends: [
    "universe/native",
    "plugin:@tanstack/eslint-plugin-query/recommended",
  ],
  plugins: ["@tanstack/query"],
  rules: {
    "@tanstack/query/exhaustive-deps": "error",
    "@tanstack/query/no-rest-destructuring": "warn",
    "@tanstack/query/stable-query-client": "error",
  },
};
