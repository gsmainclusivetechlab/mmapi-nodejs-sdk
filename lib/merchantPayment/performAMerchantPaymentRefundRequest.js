const { v4: uuidv4 } = require('uuid');

/**
  Perform A Merchant Payment Refund Request
**/
class PerformAMerchantPaymentRefundRequest {
  constructor() {
    this.url = '/transactions/type/adjustment';
    this.method = 'post';
    this.data = null;
    this.headers = {
      'Content-Type': 'application/json',
      'X-CorrelationID': uuidv4(),
      'X-Callback-URL': null
    };
  }
}

module.exports = { PerformAMerchantPaymentRefundRequest };
