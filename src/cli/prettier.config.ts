import { Config } from "prettier";

const config: Config = {
  parser: "typescript",
  semi: true,
  trailingComma: "es5",
  singleQuote: true,
  printWidth: 80,
  tabWidth: 2,
  arrowParens: "always",
  bracketSpacing: true,
  jsxBracketSameLine: false,
  useTabs: false,
};

export default config;
