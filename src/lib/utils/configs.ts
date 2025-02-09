import { Linter } from 'eslint';

const configs: { recommended: { rules: Readonly<Linter.RulesRecord> } } = {
  recommended: {
    rules: Object.freeze({
      'safeguard/no-raw-error': 'warn',
      'safeguard/trycatch-ensurer': 'error',
    }),
  },
};

export default configs;
