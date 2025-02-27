'use strict';

function isEquivalent(node1, node2) {
  if (node1.type === "Identifier" && node2.type === "Identifier") {
    return node1.name === node2.name;
  }
  if (node1.type === "MemberExpression" && node2.type === "MemberExpression" && !node1.computed && !node2.computed) {
    return isEquivalent(node1.object, node2.object) && isEquivalent(node1.property, node2.property);
  }
  return false;
}
const meta = {
  docs: {
    description: "Detects self-assignment patterns, such as `array.push(...array)` or `obj.prop = obj.prop`, which are likely logic errors.",
    recommended: false
  },
  messages: {
    noSelfAssignment: 'Detected self-assignment in "{{name}}", which is likely an error.'
  },
  schema: [],
  type: "problem"
};
const create = (context) => {
  return {
    /**
     * Checks assignment expressions, e.g., `obj.prop = obj.prop`.
     *
     * @param {any} node - The AssignmentExpression AST node.
     */
    AssignmentExpression(node) {
      if (node.operator === "=" && isEquivalent(node.left, node.right)) {
        let name = "";
        if (node.left.type === "Identifier") {
          name = node.left.name;
        } else if (node.left.type === "MemberExpression" && !node.left.computed && node.left.property.type === "Identifier") {
          const objectName = node.left.object.type === "Identifier" ? node.left.object.name : "<object>";
          name = `${objectName}.${node.left.property.name}`;
        }
        context.report({
          data: { name },
          messageId: "noSelfAssignment",
          node
        });
      }
    },
    /**
     * Checks method calls, specifically detecting cases like:
     * `array.push(...array)`.
     *
     * @param {any} node - The CallExpression AST node.
     */
    CallExpression(node) {
      if (node.callee.type === "MemberExpression" && node.callee.property.type === "Identifier" && node.callee.property.name === "push" && node.arguments.length > 0 && node.arguments[0].type === "SpreadElement" && node.callee.object.type === "Identifier" && node.arguments[0].argument.type === "Identifier") {
        if (node.callee.object.name === node.arguments[0].argument.name) {
          context.report({
            data: { name: node.callee.object.name },
            messageId: "noSelfAssignment",
            node
          });
        }
      }
    }
  };
};
const rule = { create, meta };

module.exports = rule;
