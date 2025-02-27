import { Rule } from 'eslint';
declare const rule: {
    create: (context: Rule.RuleContext) => {
        AwaitExpression(node: Rule.Node): void;
    };
    meta: Rule.RuleMetaData;
};
export default rule;
