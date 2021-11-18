const core = require('./core/index');
const accounts = require('./accounts/index')
const quotations = require('./quotations/index');
const supporting = require('./supporting/index');
const transactions = require('./transactions/index');

module.exports = {
  ...core,
  ...accounts,
  ...quotations,
  ...supporting,
  ...transactions,
};