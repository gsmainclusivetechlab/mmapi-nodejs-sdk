const { ViewAccountBalance } = require('./viewAccountBalance');
const { ViewAccountName } = require('./viewAccountName');
const { ViewAccountTransactions } = require('./viewAccountTransactions');

module.exports = {
  viewAccountBalance: ViewAccountBalance,
  viewAccountName: ViewAccountName,
  viewAccountTransactions: ViewAccountTransactions
}