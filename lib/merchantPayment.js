const {
  createMerchantTransaction,
  createAuthorisationCode,
  viewAuthorisationCode,
  createRefundTransaction
} = require('./requests/index')

module.exports = {
  createMerchantTransaction,
  createAuthorisationCode,
  viewAuthorisationCode,
  createRefundTransaction
};