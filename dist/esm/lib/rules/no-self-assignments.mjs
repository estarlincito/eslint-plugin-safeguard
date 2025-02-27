function s(t, e) {
  return t.type === "Identifier" && e.type === "Identifier" ? t.name === e.name : t.type === "MemberExpression" && e.type === "MemberExpression" && !t.computed && !e.computed ? s(t.object, e.object) && s(t.property, e.property) : !1;
}
const a = {
  type: "problem",
  docs: {
    description: "Detects self-assignment patterns, such as `array.push(...array)` or `obj.prop = obj.prop`, which are likely logic errors.",
    recommended: !1
  },
  schema: [],
  messages: {
    noSelfAssignment: 'Detected self-assignment in "{{name}}", which is likely an error.'
  }
}, p = (t) => ({
  /**
   * Checks assignment expressions, e.g., `obj.prop = obj.prop`.
   *
   * @param {any} node - The AssignmentExpression AST node.
   */
  AssignmentExpression(e) {
    if (e.operator === "=" && s(e.left, e.right)) {
      let r = "";
      e.left.type === "Identifier" ? r = e.left.name : e.left.type === "MemberExpression" && !e.left.computed && e.left.property.type === "Identifier" && (r = `${e.left.object.type === "Identifier" ? e.left.object.name : "<object>"}.${e.left.property.name}`), t.report({
        node: e,
        messageId: "noSelfAssignment",
        data: { name: r }
      });
    }
  },
  /**
   * Checks method calls, specifically detecting cases like:
   * `array.push(...array)`.
   *
   * @param {any} node - The CallExpression AST node.
   */
  CallExpression(e) {
    e.callee.type === "MemberExpression" && e.callee.property.type === "Identifier" && e.callee.property.name === "push" && e.arguments.length > 0 && e.arguments[0].type === "SpreadElement" && e.callee.object.type === "Identifier" && e.arguments[0].argument.type === "Identifier" && e.callee.object.name === e.arguments[0].argument.name && t.report({
      node: e,
      messageId: "noSelfAssignment",
      data: { name: e.callee.object.name }
    });
  }
}), l = { meta: a, create: p };
export {
  l as default
};
