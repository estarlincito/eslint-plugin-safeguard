declare const _default: {
    rules: {
        'trycatch-ensurer': {
            meta: {
                type: string;
                docs: {
                    description: string;
                    recommended: boolean;
                };
                schema: never[];
            };
            create(context: import("eslint").Rule.RuleContext): {
                AwaitExpression(node: import("eslint").Rule.Node): void;
            };
        };
    };
};
export default _default;
