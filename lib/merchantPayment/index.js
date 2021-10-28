
const { ObtainAnAuthorisationCodeRequest } = require('./obtainAnAuthorisationCodeRequest');
const { PerformAMerchantPaymentRequest } = require('./performAMerchantPaymentRequest');
const { PerformAMerchantPaymentViaPollingRequest } = require('./performAMerchantPaymentViaPollingRequest');
const { PerformAMerchantPaymentRefundRequest } = require('./performAMerchantPaymentRefundRequest');

module.exports = {
  ObtainAnAuthorisationCodeRequest,
  PerformAMerchantPaymentRefundRequest,
  PerformAMerchantPaymentRequest,
  PerformAMerchantPaymentViaPollingRequest
};