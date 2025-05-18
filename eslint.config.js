import parser from "@babel/eslint-parser";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginImport from "eslint-plugin-import";
import globals from "globals";

export default [
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      parser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ["@babel/preset-react"],
        },
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    plugins: {
      react: pluginReact,
      "react-hooks": pluginReactHooks,
      import: pluginImport,
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "warn",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "no-unused-vars": "warn",
      "import/no-unresolved": ["error", { caseSensitive: true }],
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
