import { Rule } from 'eslint';

const meta: Rule.RuleMetaData = {
  type: 'problem',
  docs: {
    description: 'Ensure that await expressions are inside try-catch blocks',
    recommended: true,
  },
  schema: [],
};

const create = (context: Rule.RuleContext) => {
  const isInTryBlock = (awaitNode: Rule.Node, tryBlock: Rule.Node): boolean => {
    let currentNode: Rule.Node | null = awaitNode;
    while (currentNode) {
      if (currentNode === tryBlock) {
        return true;
      }
      currentNode = currentNode.parent;
    }
    return false;
  };

  return {
    AwaitExpression(node: Rule.Node) {
      let currentNode: Rule.Node | null = node;
      while (currentNode) {
        const parent: Rule.Node = currentNode.parent;
        if (parent && parent.type === 'TryStatement') {
          const tryStatement = parent;
          if (isInTryBlock(node, tryStatement.block as Rule.Node)) {
            if (tryStatement.handler) return;

            context.report({
              node,
              message: 'Await expressions should be inside a try-catch block.',
            });
            return;
          }
        }
        currentNode = parent;
      }

      // No enclosing try-catch found
      context.report({
        node,
        message: 'Await expressions should be inside a try-catch block.',
      });
    },
  };
};

const rule = { meta, create };
export default rule;
