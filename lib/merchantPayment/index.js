const { GetAnAccountBalanceRequest } = require('./getAccountBalanceRequest');
const { ObtainAnAuthorisationCodeRequest } = require('./obtainAuthorisationCodeRequest');
const { PerformAMerchantPaymentRequest } = require('./performAMerchantPaymentRequest');
const { PerformMerchantPaymentUsingThePollingMethodRequest } = require('./performPaymentUsingPollingRequest');
const { PerformAMerchantPaymentRefundRequest } = require('./performRefundRequest');
const { PerformAMerchantPaymentReversalRequest } = require('./performReversalRequest')
const { RetrieveASetOfTransactionsForAnAccountRequest } = require('./retrieveTransactionsRequest');
const { RetrieveRepresentationOfTheMissingResourceRequest } = require('./retriveMissingResourceRepresentationRequest');

module.exports = {
  GetAnAccountBalanceRequest,
  ObtainAnAuthorisationCodeRequest,
  PerformAMerchantPaymentRefundRequest,
  PerformAMerchantPaymentReversalRequest,
  PerformAMerchantPaymentRequest,
  PerformMerchantPaymentUsingThePollingMethodRequest,
  RetrieveASetOfTransactionsForAnAccountRequest,
  RetrieveRepresentationOfTheMissingResourceRequest
};