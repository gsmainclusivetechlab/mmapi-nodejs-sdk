const { CreateAccount } = require('./createAccount');
const { UpdateAccountIdentity } = require('./updateAccountIdentity');
const { ViewAccountBalance } = require('./viewAccountBalance');
const { ViewAccountName } = require('./viewAccountName');
const { ViewAccountTransactions } = require('./viewAccountTransactions');
const { ViewAccount } = require('./viewAccount');

module.exports = {
  createAccount: CreateAccount,
  updateAccountIdentity: UpdateAccountIdentity,
  viewAccountBalance: ViewAccountBalance,
  viewAccountName: ViewAccountName,
  viewAccountTransactions: ViewAccountTransactions,
  viewAccount: ViewAccount
}