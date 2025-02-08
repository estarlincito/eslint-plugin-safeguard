export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Ensure that await expressions are inside try-catch blocks',

      recommended: true,
    },

    schema: [],
  },
  create(context) {
    const isInTryBlock = (awaitNode, tryBlock) => {
      let currentNode = awaitNode;
      while (currentNode) {
        if (currentNode === tryBlock) {
          return true;
        }
        currentNode = currentNode.parent;
      }
      return false;
    };
    return {
      AwaitExpression(node) {
        let currentNode = node;
        while (currentNode) {
          const parent = currentNode.parent;
          if (parent && parent.type === 'TryStatement') {
            const tryStatement = parent;
            if (isInTryBlock(node, tryStatement.block)) {
              if (tryStatement.handler) {
                // Found a try-catch enclosing the await
                return;
              } else {
                // Found a try without catch
                context.report({
                  node,
                  message:
                    'Await expressions should be inside a try-catch block.',
                });
                return;
              }
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
  },
};
