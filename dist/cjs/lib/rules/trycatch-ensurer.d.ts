import { Rule } from 'eslint';
declare const rule: {
    meta: Rule.RuleMetaData;
    create: (context: Rule.RuleContext) => {
        AwaitExpression(node: Rule.Node): void;
    };
};
export default rule;
