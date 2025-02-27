declare const _default: {
    'consistent-import-name': import("eslint").Rule.RuleModule;
    'no-raw-error': {
        create: (context: import("eslint").Rule.RuleContext) => {
            CallExpression: (node: import("eslint").Rule.Node) => void;
            NewExpression: (node: import("eslint").Rule.Node) => void;
        };
        meta: import("eslint").Rule.RuleMetaData;
    };
    'no-self-assignments': import("eslint").Rule.RuleModule;
    'trycatch-ensurer': {
        create: (context: import("eslint").Rule.RuleContext) => {
            AwaitExpression(node: import("eslint").Rule.Node): void;
        };
        meta: import("eslint").Rule.RuleMetaData;
    };
};
export default _default;
