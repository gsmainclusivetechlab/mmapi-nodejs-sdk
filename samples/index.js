const core = require('./core/index');
const accounts = require('./accounts/index');
const debitMandates = require('./debitMandates/index');
const links = require('./links/index');
const quotations = require('./quotations/index');
const supporting = require('./supporting/index');
const transactions = require('./transactions/index');

module.exports = {
  ...core,
  ...accounts,
  ...debitMandates,
  ...links,
  ...quotations,
  ...supporting,
  ...transactions
};