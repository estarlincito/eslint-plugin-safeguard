import { Rule } from 'eslint';
import ts from 'typescript';

const meta: Rule.RuleMetaData = {
  type: 'problem',
  docs: {
    description: 'Ensure import names match the original exported names',
    recommended: true,
  },
  messages: {
    defaultImportMismatch: "Default import name must be '{{originalName}}'",
    noRenamedImports: "Use original name '{{importedName}}'",
  },
  schema: [],
};

const create: Rule.RuleModule['create'] = (context) => {
  const parserServices = context.sourceCode.parserServices;
  if (!parserServices?.program || !parserServices.esTreeNodeToTSNodeMap) {
    return {};
  }
  const checker = parserServices.program.getTypeChecker();

  function getDefaultExportName(symbol: ts.Symbol): string | null {
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

      // Handle default imports
      const defaultSpecifier = node.specifiers.find(
        (s) => s.type === 'ImportDefaultSpecifier',
      );

      if (defaultSpecifier) {
        const localName = defaultSpecifier.local.name;
        const tsNode = parserServices.esTreeNodeToTSNodeMap.get(node.source);

        const moduleSymbol = checker.getSymbolAtLocation(tsNode);

        if (moduleSymbol) {
          const exports = checker.getExportsOfModule(moduleSymbol);
          const defaultExport = exports.find(
            (e: { escapedName: string }) => e.escapedName === 'default',
          );

          if (defaultExport) {
            const originalName = getDefaultExportName(defaultExport);
            if (originalName && originalName !== localName) {
              context.report({
                node: defaultSpecifier,
                messageId: 'defaultImportMismatch',
                data: { originalName },
              });
            }
          }
        }
      }

      node.specifiers.forEach((specifier) => {
        if (
          specifier.type === 'ImportSpecifier' &&
          specifier.imported.type === 'Identifier' &&
          specifier.imported.name !== specifier.local.name
        ) {
          context.report({
            node: specifier,
            messageId: 'noRenamedImports',
            data: { importedName: specifier.imported.name },
          });
        }
      });
    },
  };
};
const rule: Rule.RuleModule = { meta, create };
export default rule;
