const c = {
  type: "problem",
  docs: {
    description: "Ensure that await expressions are inside try-catch blocks",
    recommended: !0
  },
  schema: []
}, i = (s) => {
  const n = (t, r) => {
    let e = t;
    for (; e; ) {
      if (e === r)
        return !0;
      e = e.parent;
    }
    return !1;
  };
  return {
    AwaitExpression(t) {
      let r = t;
      for (; r; ) {
        const e = r.parent;
        if (e && e.type === "TryStatement") {
          const a = e;
          if (n(t, a.block)) {
            if (a.handler) return;
            s.report({
              node: t,
              message: "Await expressions should be inside a try-catch block."
            });
            return;
          }
        }
        r = e;
      }
      s.report({
        node: t,
        message: "Await expressions should be inside a try-catch block."
      });
    }
  };
}, o = { meta: c, create: i };
export {
  o as default
};
