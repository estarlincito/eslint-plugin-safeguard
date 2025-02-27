'use strict';

const meta = {
  docs: {
    description: "Disallow direct use of Error constructor",
    recommended: true
  },
  messages: {
    noRawError: 'Avoid using raw "Error". Use a custom error class instead.'
  },
  schema: [],
  type: "problem"
};
const create = (context) => {
  function checkErrorCallee(node) {
    const { callee } = node;
    if (callee.type === "Identifier" && callee.name === "Error") {
      context.report({ messageId: "noRawError", node });
    }
  }
  return {
    CallExpression: checkErrorCallee,
    NewExpression: checkErrorCallee
  };
};
const rule = { create, meta };

module.exports = rule;
