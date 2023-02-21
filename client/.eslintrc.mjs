import path from "path";

const {
  compilerOptions: { paths },
} = require("./tsconfig.json");

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  plugins: ["react", "react-hooks"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    "import/extensions": 0,
    "operator-linebreak": 0,
    "react/forbid-prop-types": ["error", { forbid: ["any", "array"] }],
    "react/jsx-wrap-multilines": [
      "error",
      { declaration: false, assignment: false },
    ],
    "react/display-name": 0,
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "import/order": [
      "warn",
      {
        "newlines-between": "always",
        warnOnUnassignedImports: true,
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
        groups: [
          'type', // prettier-ignore
          "builtin",
          "external",
          "internal",
          ["parent", "sibling"],
          "index",
          "object",
        ],
        pathGroups: [
          {
            pattern: "@**",
            group: "parent",
            position: "after",
          },
        ],
      },
    ],
    "jsdoc/require-jsdoc": 0,
    "array-element-newline": 0,
    "function-paren-newline": 0,
    "implicit-arrow-linebreak": 0,
    "object-curly-newline": 0,
  },
  settings: {
    "import/resolver": {
      // jsconfig: { config: 'jsconfig.json' },
      alias: {
        map: Object.keys(paths).reduce((acc, alias) => {
          const aliasName = alias.substring(0, alias.length - 2);
          const pattern = path.resolve(__dirname, paths[alias][0]);
          const simplePath = pattern.substring(0, pattern.length - 2);
          acc.push([aliasName, simplePath]);
          return acc;
        }, []),
      },
      node: {
        // extensions: ['.js', '.cjs', '.mjs', '.jsx', '.ts', '.tsx', '.scss', '.css'],
        moduleDirectory: ["node_modules", "src"],
      },
      react: {
        version: "detect",
      },
    },
  },
};
