declare const _default: {
    'trycatch-ensurer': {
        meta: import("eslint").Rule.RuleMetaData;
        create: (context: import("eslint").Rule.RuleContext) => {
            AwaitExpression(node: import("eslint").Rule.Node): void;
        };
    };
    'no-raw-error': {
        meta: import("eslint").Rule.RuleMetaData;
        create: (context: import("eslint").Rule.RuleContext) => {
            NewExpression: (node: import("eslint").Rule.Node) => void;
            CallExpression: (node: import("eslint").Rule.Node) => void;
        };
    };
    'consistent-import-name': import("eslint").Rule.RuleModule;
    'no-self-assignments': import("eslint").Rule.RuleModule;
};
export default _default;
