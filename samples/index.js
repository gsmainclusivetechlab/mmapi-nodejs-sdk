const core = require('./core/index');
const accounts = require('./accounts/index');
const authorisationCodes = require('./authorisationCodes/index');
const batchTransactions = require('./batchTransactions/index');
const debitMandates = require('./debitMandates/index');
const links = require('./links/index');
const quotations = require('./quotations/index');
const reversals = require('./reversals/index');
const supporting = require('./supporting/index');
const transactions = require('./transactions/index');

module.exports = {
  ...core,
  ...accounts,
  ...authorisationCodes,
  ...batchTransactions,
  ...debitMandates,
  ...links,
  ...quotations,
  ...reversals,
  ...supporting,
  ...transactions
};