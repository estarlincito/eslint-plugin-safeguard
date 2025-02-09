import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import unusedImports from 'eslint-plugin-unused-imports';

const compat = new FlatCompat({
    // eslint-disable-next-line no-undef
    baseDirectory: process.cwd(),
  }),
  oldConfig = compat.config({
    extends: [
      'plugin:@typescript-eslint/recommended',
      'plugin:import/typescript',
      'plugin:import/recommended',
      'plugin:prettier/recommended',
    ],
  });

/** @type {import('eslint').ESLint.FlatConfig[]} */
const config = [
  js.configs.recommended,
  ...oldConfig,

  {
    plugins: { 'unused-imports': unusedImports },
    files: ['src/**/*.ts'],

    rules: {
      'no-console': 'warn',
      'prefer-arrow-callback': 'error', //*
      'prefer-template': 'error', //*
      'max-len': ['off', { code: 80 }],
      'object-shorthand': 'error',
      'no-else-return': 'error',
      'no-debugger': 'warn',
      'no-unused-labels': 'error',
      'no-duplicate-imports': 'error',
      'no-var': 'error',
      'no-undef': 'error',
      'consistent-return': 'error',
      'no-unreachable': 'error',
      eqeqeq: 'error',
      'import/no-unresolved': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          vars: 'all',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
];

export default config;
