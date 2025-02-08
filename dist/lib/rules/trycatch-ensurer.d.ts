import { Rule } from 'eslint';
declare const _default: {
    meta: {
        type: string;
        docs: {
            description: string;
            recommended: boolean;
        };
        schema: never[];
    };
    create(context: Rule.RuleContext): {
        AwaitExpression(node: Rule.Node): void;
    };
};
export default _default;
