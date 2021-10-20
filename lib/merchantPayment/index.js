const { ObtainAnAuthorisationCodeRequest } = require('./obtainAnAuthorisationCodeRequest');
const { PerformAMerchantPaymentRequest } = require('./performAMerchantPaymentRequest');
const { PerformMerchantPaymentUsingThePollingMethodRequest } = require('./performMerchantPaymentUsingThePollingMethodRequest');
const { PerformAMerchantPaymentRefundRequest } = require('./performAMerchantPaymentRefundRequest');
const { PerformAMerchantPaymentReversalRequest } = require('./performAMerchantPaymentReversalRequest')
const { PollToDetermineTheRequestStateRequest } = require('./pollToDetermineTheRequestStateRequest');
const { RetrieveATransactionRequest } = require('./retrieveATransactionRequest');

module.exports = {
  ObtainAnAuthorisationCodeRequest,
  PerformAMerchantPaymentRefundRequest,
  PerformAMerchantPaymentRequest,
  PerformMerchantPaymentUsingThePollingMethodRequest,
  PerformAMerchantPaymentReversalRequest,
  PollToDetermineTheRequestStateRequest,
  RetrieveATransactionRequest
};