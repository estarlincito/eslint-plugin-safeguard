import ts from 'typescript';

const meta = {
  docs: {
    description: "Ensure import names match the original exported names",
    recommended: true
  },
  messages: {
    defaultImportMismatch: "Default import name must be '{{originalName}}'",
    noRenamedImports: "Use original name '{{importedName}}'"
  },
  schema: [],
  type: "problem"
};
const create = (context) => {
  const parserServices = context.sourceCode.parserServices;
  if (!parserServices?.program || !parserServices.esTreeNodeToTSNodeMap) {
    return {};
  }
  const checker = parserServices.program.getTypeChecker();
  function getDefaultExportName(symbol) {
    const declarations = symbol.getDeclarations() ?? [];
    for (const declaration of declarations) {
      if (ts.isFunctionDeclaration(declaration) && declaration.name) {
        return declaration.name.text;
      }
      if (ts.isVariableDeclaration(declaration) && declaration.name) {
        return declaration.name.getText();
      }
    }
    return null;
  }
  return {
    ImportDeclaration(node) {
      if (!node.source) return;
      const defaultSpecifier = node.specifiers.find(
        (s) => s.type === "ImportDefaultSpecifier"
      );
      if (defaultSpecifier) {
        const localName = defaultSpecifier.local.name;
        const tsNode = parserServices.esTreeNodeToTSNodeMap.get(node.source);
        const moduleSymbol = checker.getSymbolAtLocation(tsNode);
        if (moduleSymbol) {
          const exports = checker.getExportsOfModule(moduleSymbol);
          const defaultExport = exports.find(
            (e) => e.escapedName === "default"
          );
          if (defaultExport) {
            const originalName = getDefaultExportName(defaultExport);
            if (originalName && originalName !== localName) {
              context.report({
                data: { originalName },
                messageId: "defaultImportMismatch",
                node: defaultSpecifier
              });
            }
          }
        }
      }
      node.specifiers.forEach((specifier) => {
        if (specifier.type === "ImportSpecifier" && specifier.imported.type === "Identifier" && specifier.imported.name !== specifier.local.name) {
          context.report({
            data: { importedName: specifier.imported.name },
            messageId: "noRenamedImports",
            node: specifier
          });
        }
      });
    }
  };
};
const rule = { create, meta };

export { rule as default };
