import { TSESTree } from '@typescript-eslint/utils';
import { type Rule } from 'eslint';

const meta: Rule.RuleMetaData = {
  docs: {
    description: 'Disallow direct use of Error constructor',
    recommended: true,
  },
  messages: {
    noRawError: 'Avoid using raw "Error". Use a custom error class instead.',
  },
  schema: [],
  type: 'problem',
};

const create = (context: Rule.RuleContext) => {
  function checkErrorCallee(node: Rule.Node) {
    const { callee } = node as TSESTree.CallExpression | TSESTree.NewExpression;

    if (callee.type === 'Identifier' && callee.name === 'Error') {
      context.report({ messageId: 'noRawError', node });
    }
  }

  return {
    CallExpression: checkErrorCallee,
    NewExpression: checkErrorCallee,
  };
};

const rule = { create, meta };
export default rule;
