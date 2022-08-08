module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/parser/README.md
    // nothing called out in the readme feels appropriate and All that would
    // need to be here otherwise is implicitly added by configs extended below
  },
  plugins: [
    // All that would need to be here is implicitly added by configs extended below
  ],
  extends: [
    // eslint core config
    // https://eslint.org/docs/rules/
    // https://github.com/eslint/eslint/blob/master/conf/eslint-recommended.js
    'eslint:recommended',

    // disables conflicting rules from eslint:recommended
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/src/configs/eslint-recommended.ts
    'plugin:@typescript-eslint/eslint-recommended',

    // react config - enables plugin 'react'
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/index.js
    'plugin:react/recommended',

    // typescript config - enabled plugin '@typescript-eslint'
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/src/configs/recommended.json
    'plugin:@typescript-eslint/recommended',

    // CRA config - enables plugins ['import', 'flowtype', 'jsx-a11y', 'react', 'react-hooks', '@typescript-eslint']
    // https://github.com/facebook/create-react-app/blob/master/packages/eslint-config-react-app/index.js
    'react-app',

    // prettier style nit overrides from eslint-config-prettier https://github.com/prettier/eslint-config-prettier
    // this is different from the plugin and does not enforce prettier through eslint, but just turns off potentially conflicting rules
    'prettier',
    'plugin:storybook/recommended',
  ],
  rules: {
    /***
     * Numeric error codes
     * words are easier to read than numbers
     *
     * 0 => off
     * 1 => warn, indicate bad practice, but nothing that would usually lead to bugs, should not halt build
     * 2 => error, alert the reader that this has been known to lead to bugs and should be investigated further, should stop the build and be fixed
     ***/

    /** These @type/react named types often cause more problems than they solve
     *
     * 1. Avoiding these types allows us to use differnt types to provde guardrails
     *    on our propType definitions than our final exported type. This is useful
     *    in situations where we don't want to document every valid propType
     *    available to a native DOM element or if we use advanced Typescript features.
     * 2. react-docgen-typescript cannot generate a props table if we define our
     *    types with React.FC or its cousins. It works fine if we provide our
     *    types to the right of the = sign. Currently we still generate our
     *    props documentation using propTypes, but this rule makes it easier
     *    to drop propTypes in the future.
     * 3. React.FC always causes components to support children. You can use
     *    React.VFC instead, but it doesn't hurt to be more explicit and less
     *    reliant on magic type names.
     *
     * Incorrect:
     * ```
     * const Avatar: React.VFC<AvatarProps> = ({ imageAlt, image, initials, size = 'medium', className }) => (
     * ```
     *
     * Correct:
     * ```
     * const Avatar = ({ imageAlt, image, initials, size = 'medium', className }: AvatarProps): ReactElement => {
     * or
     * function Avatar({ imageAlt, image, initials, size = 'medium', className }: AvatarProps): ReactElement {
     * ```
     */
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          'React.StatelessComponent': {
            message: 'Define your props type and return type to the right of the `(` instead.',
          },
          'React.FunctionalComponent': {
            message: 'Define your props type and return type to the right of the `(` instead.',
          },
          'React.VoidFunctionComponent': {
            message: 'Define your props type and return type to the right of the `(` instead.',
          },
          'React.SFC': { message: 'Define your props type and return type to the right of the `(` instead.' },
          'React.FC': { message: 'Define your props type and return type to the right of the `(` instead.' },
          'React.VFC': { message: 'Define your props type and return type to the right of the `(` instead.' },
          StatelessComponent: {
            message: 'Define your props type and return type to the right of the `(` instead.',
          },
          FunctionalComponent: {
            message: 'Define your props type and return type to the right of the `(` instead.',
          },
          VoidFunctionComponent: {
            message: 'Define your props type and return type to the right of the `(` instead.',
          },
          SFC: { message: 'Define your props type and return type to the right of the `(` instead.' },
          FC: { message: 'Define your props type and return type to the right of the `(` instead.' },
          VFC: { message: 'Define your props type and return type to the right of the `(` instead.' },
        },
      },
    ],

    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        /* This is particularly needed for test files */
        allowExpressions: true,
        /* allows using React.FC for typing components */
        allowTypedFunctionExpressions: true,
      },
    ],

    'import/no-extraneous-dependencies': [
      'error',
      {
        /* dev deps are only allowed in test files (exception should be made for supporting scripts like enzyme adapter script) */
        devDependencies: ['**/*.test.js', '**/*.test.ts', '**/*.test.jsx', '**/*.test.tsx'],
        /* never used any of the following. Not sure why the should be allowed */
        optionalDependencies: false,
      },
    ],

    'no-console': 'warn',
    'no-restricted-properties': [
      'error',
      {
        /** Typescript has built in support for setting default values when
         * destructuring objects. This works much better than defaultProps.
         *
         * Incorrect:
         * ```
         * function Avatar({ size }: AvatarProps):ReactElement {
         *   ...
         * }
         * Avatar.defaultProps = {
         *   size: 'medium'
         * }
         * ```
         *
         * Correct:
         * ```
         * function Avatar({ size = 'medium' }: AvatarProps): ReactElement {
         * ```
         */
        property: 'defaultProps',
        message: 'Set default values when destructuring props.',
      },
    ],
    'prettier/prettier': 'warn',

    'react/destructuring-assignment': ['warn', 'always'],
    'react/prop-types': 'off', // laughs in typescript
    'react/react-in-jsx-scope': 'off',

    // style rules that prettier does not handle (causes AST transformation)

    // This rule is a port of the eslint standard rule, but the typescript
    // recommended disables that one and enables this. So turning it off as
    // teams should feel free to have their own naming conventions
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/camelcase.md
    '@typescript-eslint/camelcase': 'off',
    // By default plugin:@typescript-eslint/recommended enables the below rule with "error" as warning
    // With EXTEND_ESLINT=true in .env the build fails as we have a empty interface "export interface AppProps {}" in App.tsx required for the application props from the parent application
    // With making the below rule "warn" a warning is showed when "npm run build" and "npm run start" instead of error
    '@typescript-eslint/no-empty-interface': 'warn',
  },
  overrides: [
    {
      // Our test files should have fewer restrictions
      files: ['*.test.ts', '*.test.tsx'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-namespace': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        'no-console': 'off',
      },
    },
    {
      files: [
        '@scope/ladle-218-reproduction-guide/plugins/**/*',
        '@scope/ladle-218-reproduction-guide/src/queries/**/*',
        '@scope/ladle-218-reproduction/dev-tools/**/*',
        '**/scripts/**/*',
      ],
      rules: {
        /* These files are only used to build their projects, so their
         * dependencies can live in devDependencies */
        'import/no-extraneous-dependencies': 'off',
      },
    },
    // Allow usage of console.warn and .error in the guide
    {
      files: ['@scope/ladle-218-reproduction-guide/**'],
      rules: {
        'no-console': ['error', { allow: ['warn', 'error'] }],
      },
    },
    // Allow usage of console the fabricator and build scripts
    {
      files: ['scripts/**/*'],
      rules: {
        'no-console': 'off',
      },
    },
    {
      files: ['*.stories.tsx', '*.test.ts', '*.test.tsx', '@scope/ladle-218-reproduction/src/utils/storybook/**/*'],
      rules: {
        /* These files are not part of the bundle, so their
         * dependencies can live in devDependencies */
        'import/no-extraneous-dependencies': 'off',
        /** These files should always import from top level index to ensure we don't
         *  forget to export the components that they are testing. */
        'no-restricted-imports': [
          'error',
          {
            patterns: ['./*', '.', '../*'],
          },
        ],
      },
    },
    {
      // Simplify rules for manually created *.d.ts files for as long as we have them
      files: ['*.d.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/ban-types': 'off',
      },
    },
    {
      files: ['*.js', '*.jsx', '*.cjs', '*.mjs'],
      extends: [
        'plugin:react/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:prettier/recommended',
        'plugin:storybook/recommended',
      ],
      env: {
        browser: true,
        mocha: true,
      },
      parser: '@babel/eslint-parser',
      parserOptions: {
        ecmaFeatures: {
          experimentalObjectRestSpread: true,
          jsx: true,
        },
        sourceType: 'module',
      },
      plugins: ['react', 'jsx-a11y', 'prettier'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-this-alias': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        camelcase: 'off',
        'default-case': 'off',
        'import/no-extraneous-dependencies': 'off',
        'jsx-a11y/label-has-for': [
          2,
          {
            required: {
              some: ['nesting', 'id'],
            },
          },
        ],
        'jsx-a11y/no-autofocus': [
          2,
          {
            ignoreNonDOM: true,
          },
        ],
        'no-restricted-properties': 'off',
        'no-unused-expressions': 'off',
        'no-useless-concat': 'off',
        'no-useless-escape': 'off',
        'react-hooks/exhaustive-deps': 'off',
        'react/button-has-type': 'error',
        'react/destructuring-assignment': 'off',
        'react/display-name': 'off',
        'react/no-unsafe': 'error',
        'react/prop-types': 'warn',
        'react/react-in-jsx-scope': 'off',
      },
      settings: {
        react: {
          version: 'detect',
        },
      },
    },
  ],
};
