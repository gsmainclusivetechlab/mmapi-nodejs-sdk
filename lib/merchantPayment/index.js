const { GetAnAccountBalanceRequest } = require('./getAccountBalanceRequest');
const { ObtainAnAuthorisationCodeRequest } = require('./obtainAuthorisationCodeRequest');
const { PerformAMerchantPaymentRequest } = require('./performPaymentRequest');
const { PerformMerchantPaymentUsingThePollingMethodRequest } = require('./performPaymentUsingPollingRequest');
const { PerformAMerchantPaymentRefundRequest } = require('./performRefundRequest');
const { PerformAMerchantPaymentReversalRequest } = require('./performReversalRequest')
const { PollToDetermineTheRequestStateRequest } = require('./pollRequestStateRequest');
const { RetrieveATransactionRequest } = require('./retrieveTransactionRequest');
const { RetrieveASetOfTransactionsForAnAccountRequest } = require('./retrieveTransactionsRequest');
const { CheckForServiceAvailabilityRequest } = require('./checkServiceAvailabilityRequest');
const { RetrieveAMissingApiResponseRequest } = require('./retrieveMissingApiResponseRequest');
const { RetrieveRepresentationOfTheMissingResourceRequest } = require('./retriveMissingResourceRepresentationRequest');

module.exports = {
  CheckForServiceAvailabilityRequest,
  GetAnAccountBalanceRequest,
  ObtainAnAuthorisationCodeRequest,
  PerformAMerchantPaymentRefundRequest,
  PerformAMerchantPaymentReversalRequest,
  PerformAMerchantPaymentRequest,
  PerformMerchantPaymentUsingThePollingMethodRequest,
  PollToDetermineTheRequestStateRequest,
  RetrieveATransactionRequest,
  RetrieveASetOfTransactionsForAnAccountRequest,
  RetrieveAMissingApiResponseRequest,
  RetrieveRepresentationOfTheMissingResourceRequest
};