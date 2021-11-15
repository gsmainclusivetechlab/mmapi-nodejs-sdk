
const { CreateAnAuthorisationCodeRequest } = require('./createAnAuthorisationCodeRequest');
const { CreateMerchantTransaction } = require('./createMerchantTransaction');
const { CreateARefundTransactionRequest } = require('./createARefundTransactionRequest');

module.exports = {
  CreateAnAuthorisationCodeRequest,
  CreateARefundTransactionRequest,
  createMerchantTransaction: CreateMerchantTransaction,
};