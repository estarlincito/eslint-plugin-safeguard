import { Rule } from 'eslint';
declare const rule: {
    create: (context: Rule.RuleContext) => {
        CallExpression: (node: Rule.Node) => void;
        NewExpression: (node: Rule.Node) => void;
    };
    meta: Rule.RuleMetaData;
};
export default rule;
