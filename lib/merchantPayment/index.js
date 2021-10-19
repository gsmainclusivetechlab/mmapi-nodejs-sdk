const { ObtainAnAuthorisationCodeRequest } = require('./obtainAnAuthorisationCodeRequest');
const { PerformAMerchantPaymentRequest } = require('./performAMerchantPaymentRequest');
const { PollToDetermineTheRequestStateRequest } = require('./pollToDetermineTheRequestStateRequest');
const { RetrieveATransactionRequest } = require('./retrieveATransactionRequest');

module.exports = {
  ObtainAnAuthorisationCodeRequest,
  PerformAMerchantPaymentRequest,
  PollToDetermineTheRequestStateRequest,
  RetrieveATransactionRequest
};