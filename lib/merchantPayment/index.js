const { ObtainAnAuthorisationCodeRequest } = require('./obtainAnAuthorisationCodeRequest');
const { PerformAMerchantPaymentRequest } = require('./performAMerchantPaymentRequest');
const { PerformMerchantPaymentUsingThePollingMethodRequest } = require('./performMerchantPaymentUsingThePollingMethodRequest');
const { PollToDetermineTheRequestStateRequest } = require('./pollToDetermineTheRequestStateRequest');
const { RetrieveATransactionRequest } = require('./retrieveATransactionRequest');

module.exports = {
  ObtainAnAuthorisationCodeRequest,
  PerformAMerchantPaymentRequest,
  PerformMerchantPaymentUsingThePollingMethodRequest,
  PollToDetermineTheRequestStateRequest,
  RetrieveATransactionRequest
};