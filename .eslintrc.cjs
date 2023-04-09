module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true,
    browser: true
  },
  parser: "@typescript-eslint/parser",
  parserOptions: { ecmaVersion: "latest", sourceType: "module"},
  ignorePatterns: ["node_modules/*", "dist/*", "**/*.css", "**/*.scss"],
  extends: ["eslint:recommended"],
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
      settings: {
        react: { version: "detect" },
        "import/resolver": {
          typescript: {}
        }
      },
      extends: [
        "eslint:recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:prettier/recommended"
      ],
      rules: {
        "no-restricted-imports": [
          "error",
          {
            patterns: ["@/features/*/*"]
          }
        ],
        "linebreak-style": ["error", "unix"],
        "react/prop-types": "off",

        "import/order": [
          "error",
          {
            groups: [
              "builtin",
              "external",
              "internal",
              "parent",
              "sibling",
              "index",
              "object"
            ],
            "newlines-between": "always",
            alphabetize: { order: "asc", caseInsensitive: true }
          }
        ],
        "import/default": "off",
        "import/no-named-as-default-member": "off",
        "import/no-named-as-default": "off",

        "react/react-in-jsx-scope": "off",
        "react/display-name": 0,

        "@typescript-eslint/no-unused-vars": ["error"],

        "@typescript-eslint/explicit-function-return-type": ["off"],
        "@typescript-eslint/explicit-module-boundary-types": ["off"],
        "@typescript-eslint/no-empty-function": ["off"],
        "@typescript-eslint/no-explicit-any": ["off"],

        "prettier/prettier": ["error", {}, { usePrettierrc: true }]
      }
    }
  ]
}
