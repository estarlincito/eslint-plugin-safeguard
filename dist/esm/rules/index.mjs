import rule$3 from './consistent-import-name.mjs';
import rule$2 from './no-raw-error.mjs';
import rule$1 from './no-self-assignments.mjs';
import rule from './trycatch-ensurer.mjs';

const rules = {
  "consistent-import-name": rule$3,
  "no-raw-error": rule$2,
  "no-self-assignments": rule$1,
  "trycatch-ensurer": rule
};

export { rules as default };
