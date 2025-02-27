import c from "typescript";
const l = {
  type: "problem",
  docs: {
    description: "Ensure import names match the original exported names",
    recommended: !0
  },
  messages: {
    defaultImportMismatch: "Default import name must be '{{originalName}}'",
    noRenamedImports: "Use original name '{{importedName}}'"
  },
  schema: []
}, f = (n) => {
  const a = n.sourceCode.parserServices;
  if (!a?.program || !a.esTreeNodeToTSNodeMap)
    return {};
  const m = a.program.getTypeChecker();
  function p(t) {
    const o = t.getDeclarations() ?? [];
    for (const e of o) {
      if (c.isFunctionDeclaration(e) && e.name)
        return e.name.text;
      if (c.isVariableDeclaration(e) && e.name)
        return e.name.getText();
    }
    return null;
  }
  return {
    ImportDeclaration(t) {
      if (!t.source) return;
      const o = t.specifiers.find(
        (e) => e.type === "ImportDefaultSpecifier"
      );
      if (o) {
        const e = o.local.name, d = a.esTreeNodeToTSNodeMap.get(t.source), s = m.getSymbolAtLocation(d);
        if (s) {
          const i = m.getExportsOfModule(s).find(
            (r) => r.escapedName === "default"
          );
          if (i) {
            const r = p(i);
            r && r !== e && n.report({
              node: o,
              messageId: "defaultImportMismatch",
              data: { originalName: r }
            });
          }
        }
      }
      t.specifiers.forEach((e) => {
        e.type === "ImportSpecifier" && e.imported.type === "Identifier" && e.imported.name !== e.local.name && n.report({
          node: e,
          messageId: "noRenamedImports",
          data: { importedName: e.imported.name }
        });
      });
    }
  };
}, N = { meta: l, create: f };
export {
  N as default
};
