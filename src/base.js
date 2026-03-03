import { fixupPluginRules } from '@eslint/compat';
import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import _import from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import turboPlugin from 'eslint-plugin-turbo';
import unusedImports from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';

/**
 * A shared ESLint configuration for the repository.
 *
 * @returns {import("eslint").Linter.Config}
 * @param {Object} [args]
 * @param {string} [args.tsconfigRootDir] - https://typescript-eslint.io/packages/parser/#tsconfigrootdir, defaults to process.cwd()
 * @param {Object} [args.turbo] - turborepo specific options
 * @param {Boolean} [args.turbo.enabled] - turborepo enabled, default is false
 * @param {string[]} [args.turbo.noUndeclaredEnvVarsAllowList] - list of undeclared env vars to allow
 * */
export const getConfig = args => {
  const turboEnabled = !!args?.turbo?.enabled;
  const config = [
    {
      ignores: ['**/node_modules/', '**/out/', '**/dist/', '**/build/', '**/.yarn/'],
    },

    js.configs.recommended,
    eslintConfigPrettier,

    ...tseslint.configs.recommended,
    {
      files: ['**/*.{ts,tsx,js,jsx}'],
      languageOptions: {
        globals: {
          process: 'readonly',
        },
        parserOptions: {
          tsconfigRootDir: args?.tsconfigRootDir ?? process.cwd(),
          project: ['./apps/*/tsconfig.json'],
        },
      },
    },

    {
      plugins: {
        turbo: turboEnabled ? turboPlugin : {},
        import: fixupPluginRules(_import),
        'simple-import-sort': simpleImportSort,
        'unused-imports': unusedImports,
        prettier,
      },
      rules: {
        'turbo/no-undeclared-env-vars': turboEnabled
          ? [
              'warn',
              {
                allowList: args?.turbo?.noUndeclaredEnvVarsAllowList,
              },
            ]
          : 0,

        //
        'import/extensions': 0,
        'import/first': 2,
        'import/newline-after-import': 2,
        'import/no-duplicates': 2,
        'import/no-extraneous-dependencies': 0,
        'import/prefer-default-export': 0,
        'no-console': 2,
        'no-param-reassign': 0,
        'no-underscore-dangle': 0,
        'prettier/prettier': 2,
        'simple-import-sort/exports': 2,
        'simple-import-sort/imports': 2,
        'unused-imports/no-unused-imports': 2,
        curly: [2, 'multi-line', 'consistent'],

        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '_[iI]gnored',
          },
        ],
      },
    },

    {
      files: ['**/*.ts?(x)'],
      rules: { 'no-redeclare': 0 },
    },
  ];
  return config;
};
