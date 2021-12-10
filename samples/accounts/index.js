const { viewAccountBalance, viewAccountBalanceRequestPath } = require('./viewAccountBalance');
const { viewAccountName, viewAccountNameRequestPath } = require('./viewAccountName');
const { viewAccountTransactions } = require('./viewAccountTransactions');

module.exports = {
  viewAccountBalance,
  viewAccountBalanceRequestPath,
  viewAccountName,
  viewAccountNameRequestPath,
  viewAccountTransactions,
  viewAccountTransactionsRequestPath
}