import js from "@eslint/js";
import globals from "globals";
import babelParser from "@babel/eslint-parser";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        allowImportExportEverywhere: true,
      },
      globals: {
        ...globals.node,
        ...globals.es2015,
        my: "writable",
        App: "writable",
        Component: "writable",
        Page: "writable",
      },
    },
    rules: {
      "no-console": "warn",
      "no-undef": "off",
    },
  },
];