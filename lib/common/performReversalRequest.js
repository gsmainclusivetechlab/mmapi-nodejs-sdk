const { v4: uuidv4 } = require('uuid');

/**
  Perform A Merchant Payment Reversal Request
**/
class PerformAMerchantPaymentReversalRequest {
  constructor() {
    this.url = '/transactions/{originalTransactionReference}/reversals';
    this.method = 'post';
    this.data = {
      type: 'reversal',
    };
    this.headers = {
      'Content-Type': 'application/json',
      'X-CorrelationID': uuidv4()
    };
  }

  xCallbackURL(xCallbackURL) {
    this.headers['X-Callback-URL'] = xCallbackURL;
    return this;
  }

  originalTransactionReference(originalTransactionReference) {
    this.url = this.url.replace('{originalTransactionReference}', originalTransactionReference);
    return this;
  }
}

module.exports = { PerformAMerchantPaymentReversalRequest };
