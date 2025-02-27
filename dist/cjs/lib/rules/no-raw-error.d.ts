import { Rule } from 'eslint';
declare const rule: {
    meta: Rule.RuleMetaData;
    create: (context: Rule.RuleContext) => {
        NewExpression: (node: Rule.Node) => void;
        CallExpression: (node: Rule.Node) => void;
    };
};
export default rule;
