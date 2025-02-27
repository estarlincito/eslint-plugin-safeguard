'use strict';

const meta = {
  docs: {
    description: "Ensure that await expressions are inside try-catch blocks",
    recommended: true
  },
  schema: [],
  type: "problem"
};
const create = (context) => {
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
        if (parent && parent.type === "TryStatement") {
          const tryStatement = parent;
          if (isInTryBlock(node, tryStatement.block)) {
            if (tryStatement.handler) return;
            context.report({
              message: "Await expressions should be inside a try-catch block.",
              node
            });
            return;
          }
        }
        currentNode = parent;
      }
      context.report({
        message: "Await expressions should be inside a try-catch block.",
        node
      });
    }
  };
};
const rule = { create, meta };

module.exports = rule;
