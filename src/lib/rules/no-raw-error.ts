import { type Rule } from 'eslint';
import { TSESTree } from '@typescript-eslint/utils';

const meta: Rule.RuleMetaData = {
  type: 'problem',
  docs: {
    description: 'Disallow direct use of Error constructor',
    recommended: true,
  },
  messages: {
    noRawError: 'Avoid using raw "Error". Use a custom error class instead.',
  },
  schema: [],
};

const create = (context: Rule.RuleContext) => {
  function checkErrorCallee(node: Rule.Node) {
    const { callee } = node as TSESTree.CallExpression | TSESTree.NewExpression;

    if (callee.type === 'Identifier' && callee.name === 'Error') {
      context.report({ node, messageId: 'noRawError' });
    }
  }

  return {
    NewExpression: checkErrorCallee,
    CallExpression: checkErrorCallee,
  };
};

const rule = { meta, create };
export default rule;
