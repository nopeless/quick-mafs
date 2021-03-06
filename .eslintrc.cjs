module.exports = {
  root: true,
  parser: `@typescript-eslint/parser`,
  plugins: [`@typescript-eslint`, `import-quotes`, `import`, `prettier`],
  extends: [
    `eslint:recommended`,
    `plugin:@typescript-eslint/eslint-recommended`,
    `plugin:@typescript-eslint/recommended`,
  ],
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: `module`,
  },
  rules: {
    "prettier/prettier": `warn`,
    "no-console": `warn`,
    "func-names": `off`,
    "no-underscore-dangle": `off`,
    "consistent-return": [`error`, { treatUndefinedAsUnspecified: true }],
    "jest/expect-expect": `off`,
    "security/detect-object-injection": `off`,
    "no-unused-vars": `warn`,
    "import-quotes/import-quotes": [`error`, `double`],

    "import/extensions": [
      `error`,
      `ignorePackages`,
      {
        js: `always`,
      },
    ],

    "array-callback-return": [
      `error`,
      {
        allowImplicit: true,
        checkForEach: true,
      },
    ],
    "no-duplicate-imports": `error`,
    "no-promise-executor-return": `error`,
    "no-use-before-define": [`error`, { functions: true, classes: true }],
    "require-atomic-updates": `error`,
    camelcase: [
      `warn`,
      {
        properties: `never`,
        ignoreDestructuring: true,
        ignoreImports: true,
        ignoreGlobals: false,
        allow: [`access_token`, `refresh_token`],
      },
    ],
    complexity: `warn`,

    "spaced-comment": `error`,

    "linebreak-style": [`error`, `unix`],
    semi: [`error`, `always`],
    quotes: [`error`, `backtick`],
    indent: [`error`, 2],
    "quote-props": [`error`, `as-needed`],
    strict: 0,
    "comma-dangle": [
      `error`,
      {
        arrays: `always-multiline`,
        objects: `always-multiline`,
        imports: `always-multiline`,
        exports: `always-multiline`,
      },
    ],
    "no-trailing-spaces": `error`,
    "space-infix-ops": [`error`, { int32Hint: false }],
    "eol-last": [`error`, `always`],
    "comma-style": [
      `error`,
      `last`,
      {
        exceptions: {
          ImportDeclaration: true,
        },
      },
    ],
  },
};
