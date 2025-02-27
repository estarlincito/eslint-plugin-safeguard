// import { type Rule } from 'eslint';

// const meta: Rule.RuleMetaData = {
//   type: 'suggestion',
//   docs: {
//     description: 'Enforce type imports to have "type" modifier',
//     recommended: true,
//   },
//   fixable: 'code',
//   messages: {
//     noRawError: '',
//     requireTypeModifier: 'Import of type "{{name}}" must use "type" modifier.',
//   },
//   schema: [],
// };

// const create = (context: Rule.RuleContext) => {
//   const parserServices = context.sourceCode.parserServices;
//   if (
//     !parserServices ||
//     !parserServices.program ||
//     !parserServices.esTreeNodeToTSNodeMap
//   ) {
//     throw new Error('This rule requires type information.');
//   }
//   const typeChecker = parserServices.program.getTypeChecker();

//   function isTypeOnly(symbol) {
//     return (
//       symbol?.declarations?.every((decl) => {
//         return (
//           ts.isInterfaceDeclaration(decl) || ts.isTypeAliasDeclaration(decl)
//         );
//       }) ?? false
//     );
//   }

//   function checkSpecifier(specifier, node) {
//     const localIdentifier = specifier.local;
//     const tsNode = parserServices.esTreeNodeToTSNodeMap.get(localIdentifier);
//     const symbol = typeChecker.getSymbolAtLocation(tsNode);

//     if (symbol && isTypeOnly(symbol)) {
//       if (
//         specifier.type === 'ImportSpecifier' &&
//         specifier.importKind !== 'type'
//       ) {
//         context.report({
//           node: specifier,
//           messageId: 'requireTypeModifier',
//           data: { name: specifier.imported.name },
//           fix(fixer) {
//             return fixer.insertTextBefore(specifier, 'type ');
//           },
//         });
//       } else if (specifier.type === 'ImportDefaultSpecifier') {
//         context.report({
//           node: specifier,
//           messageId: 'requireTypeModifier',
//           data: { name: 'default' },
//           fix(fixer) {
//             if (node.specifiers.length === 1) {
//               const importToken = context.sourceCode.getFirstToken(node);
//               return fixer.insertTextAfter(importToken, ' type');
//             }
//             return null;
//           },
//         });
//       }
//     }
//   }

//   return {
//     ImportDeclaration(node) {
//       if (node.importKind === 'type') return;

//       node.specifiers.forEach((specifier) => {
//         checkSpecifier(specifier, node);
//       });
//     },
//   };
// };

// const rule = { meta, create };
// export default rule;
