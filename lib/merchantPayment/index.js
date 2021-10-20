const { ObtainAnAuthorisationCodeRequest } = require('./obtainAnAuthorisationCodeRequest');
const { PerformAMerchantPaymentRequest } = require('./performAMerchantPaymentRequest');
const { PerformMerchantPaymentUsingThePollingMethodRequest } = require('./performMerchantPaymentUsingThePollingMethodRequest');
const { PollToDetermineTheRequestStateRequest } = require('./pollToDetermineTheRequestStateRequest');
const { RetrieveATransactionRequest } = require('./retrieveATransactionRequest');
const { PerformAMerchantPaymentRefundRequest } = require('./performAMerchantPaymentRefundRequest');

module.exports = {
  ObtainAnAuthorisationCodeRequest,
  PerformAMerchantPaymentRefundRequest,
  PerformAMerchantPaymentRequest,
  PerformMerchantPaymentUsingThePollingMethodRequest,
  PollToDetermineTheRequestStateRequest,
  RetrieveATransactionRequest
};