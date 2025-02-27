import { Rule } from 'eslint';

/**
 * Checks if two AST nodes are equivalent in the context of self-assignment.
 * Currently supports Identifiers and non-computed MemberExpressions.
 *
 * @param {any} node1 - First AST node.
 * @param {any} node2 - Second AST node.
 * @returns {boolean} True if both nodes are considered equivalent.
 */
function isEquivalent(node1: any, node2: any): boolean {
  // If both are identifiers, compare their names.
  if (node1.type === 'Identifier' && node2.type === 'Identifier') {
    return node1.name === node2.name;
  }

  // If both are MemberExpressions (without computed properties), compare object and property.
  if (
    node1.type === 'MemberExpression' &&
    node2.type === 'MemberExpression' &&
    !node1.computed &&
    !node2.computed
  ) {
    return (
      isEquivalent(node1.object, node2.object) &&
      isEquivalent(node1.property, node2.property)
    );
  }

  return false;
}

/**
 * Rule metadata.
 */
const meta: Rule.RuleMetaData = {
  type: 'problem',
  docs: {
    description:
      'Detects self-assignment patterns, such as `array.push(...array)` or `obj.prop = obj.prop`, which are likely logic errors.',
    recommended: false,
  },
  schema: [],
  messages: {
    noSelfAssignment:
      'Detected self-assignment in "{{name}}", which is likely an error.',
  },
};

/**
 * ESLint rule create function.
 *
 * @param {Rule.RuleContext} context - The ESLint rule context.
 * @returns {object} Visitors to traverse the AST.
 */
const create: Rule.RuleModule['create'] = (context) => {
  return {
    /**
     * Checks assignment expressions, e.g., `obj.prop = obj.prop`.
     *
     * @param {any} node - The AssignmentExpression AST node.
     */
    AssignmentExpression(node: any) {
      // Only check simple assignments (`=`, not `+=`, `-=`, etc.).
      if (node.operator === '=' && isEquivalent(node.left, node.right)) {
        let name = '';

        // If it's an identifier, use its name.
        if (node.left.type === 'Identifier') {
          name = node.left.name;
        }
        // If it's a MemberExpression, construct a name like "obj.prop".
        else if (
          node.left.type === 'MemberExpression' &&
          !node.left.computed &&
          node.left.property.type === 'Identifier'
        ) {
          const objectName =
            node.left.object.type === 'Identifier'
              ? node.left.object.name
              : '<object>';
          name = `${objectName}.${node.left.property.name}`;
        }

        context.report({
          node,
          messageId: 'noSelfAssignment',
          data: { name },
        });
      }
    },

    /**
     * Checks method calls, specifically detecting cases like:
     * `array.push(...array)`.
     *
     * @param {any} node - The CallExpression AST node.
     */
    CallExpression(node: any) {
      if (
        node.callee.type === 'MemberExpression' &&
        node.callee.property.type === 'Identifier' &&
        node.callee.property.name === 'push' &&
        node.arguments.length > 0 &&
        node.arguments[0].type === 'SpreadElement' &&
        node.callee.object.type === 'Identifier' &&
        node.arguments[0].argument.type === 'Identifier'
      ) {
        if (node.callee.object.name === node.arguments[0].argument.name) {
          context.report({
            node,
            messageId: 'noSelfAssignment',
            data: { name: node.callee.object.name },
          });
        }
      }
    },
  };
};

/**
 * ESLint rule module that prevents self-assignment (`x = x`)
 * and self-spreading in arrays (`array.push(...array)`).
 *
 * @type {Rule.RuleModule}
 */
const rule: Rule.RuleModule = { meta, create };
export default rule;
