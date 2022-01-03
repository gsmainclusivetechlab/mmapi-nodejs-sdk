const { createAccount } = require('./createAccount');
const { updateAccountIdentity } = require('./updateAccountIdentity');
const { viewAccountBalance } = require('./viewAccountBalance');
const { viewAccountName } = require('./viewAccountName');
const { viewAccountTransactions } = require('./viewAccountTransactions');
const { viewAccount } = require('./viewAccount');

module.exports = {
  createAccount,
  updateAccountIdentity,
  viewAccountBalance,
  viewAccountName,
  viewAccountTransactions,
  viewAccount
}