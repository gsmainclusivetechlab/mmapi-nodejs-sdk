const core = require('./core/index');
const accounts = require('./accounts/index')
const quotations = require('./quotations/index');
const supporting = require('./supporting/index');
const transactions = require('./transactions/index');
const { createAccountDebitMandate, viewAccountDebitMandate } = require('./debitMandates/index');

module.exports = {
  core,
  accounts,
  quotations,
  supporting,
  transactions,
  recurringPayment: {
    createAccountDebitMandate,
    createMerchantTransaction: require('./transactions/index').createMerchantTransaction,
    createRefundTransaction: require('./transactions/index').createRefundTransaction,
    viewAccountDebitMandate,
  }
};
