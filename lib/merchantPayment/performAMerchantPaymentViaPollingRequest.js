const { v4: uuidv4 } = require('uuid');

/**
  Perform A Merchant Payment Via Polling Request
**/
class PerformAMerchantPaymentViaPollingRequest {
  constructor() {
    this.url = '/transactions/type/merchantpay';
    this.method = 'post';
    this.data = null;
    this.headers = {
      'Content-Type': 'application/json',
      'X-CorrelationID': uuidv4()
    };
  }
}

module.exports = { PerformAMerchantPaymentViaPollingRequest };
