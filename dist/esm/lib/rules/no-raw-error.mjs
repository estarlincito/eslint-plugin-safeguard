const t = {
  type: "problem",
  docs: {
    description: "Disallow direct use of Error constructor",
    recommended: !0
  },
  messages: {
    noRawError: 'Avoid using raw "Error". Use a custom error class instead.'
  },
  schema: []
}, a = (s) => {
  function r(e) {
    const { callee: o } = e;
    o.type === "Identifier" && o.name === "Error" && s.report({ node: e, messageId: "noRawError" });
  }
  return {
    NewExpression: r,
    CallExpression: r
  };
}, c = { meta: t, create: a };
export {
  c as default
};
