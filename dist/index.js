// module.exports = {
//   rules: { 'trycatch-ensurer': require('./lib/rules/trycatch-ensurer') },
// };
import trycatchEnsurer from './lib/rules/trycatch-ensurer.js';
export default {
    rules: {
        'trycatch-ensurer': trycatchEnsurer,
    },
};
