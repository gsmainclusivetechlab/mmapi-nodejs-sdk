const { viewAccountBalance } = require('./viewAccountBalance');
const { viewAccountName, viewAccountNameRequestPath } = require('./viewAccountName');
const { viewAccountTransactions } = require('./viewAccountTransactions');

module.exports = {
  viewAccountBalance,
  viewAccountName,
  viewAccountNameRequestPath,
  viewAccountTransactions,
  viewAccountTransactionsRequestPath
}