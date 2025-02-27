'use strict';

const consistentImportName = require('./consistent-import-name.cjs');
const noRawError = require('./no-raw-error.cjs');
const noSelfAssignments = require('./no-self-assignments.cjs');
const trycatchEnsurer = require('./trycatch-ensurer.cjs');

const rules = {
  "consistent-import-name": consistentImportName,
  "no-raw-error": noRawError,
  "no-self-assignments": noSelfAssignments,
  "trycatch-ensurer": trycatchEnsurer
};

module.exports = rules;
