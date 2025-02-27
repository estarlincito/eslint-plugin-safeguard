import { Rule } from 'eslint';
/**
 * ESLint rule module that prevents self-assignment (`x = x`)
 * and self-spreading in arrays (`array.push(...array)`).
 *
 * @type {Rule.RuleModule}
 */
declare const rule: Rule.RuleModule;
export default rule;
