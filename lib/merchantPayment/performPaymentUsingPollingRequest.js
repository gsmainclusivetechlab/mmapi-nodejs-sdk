const { v4: uuidv4 } = require('uuid');

/**
  Perform Merchant Payment Using The Polling Method Request
**/
class PerformMerchantPaymentUsingThePollingMethodRequest {
  constructor() {
    this.url = '/transactions/type/merchantpay';
    this.method = 'post';
    this.data = null;
    this.headers = {
      'Content-Type': 'application/json',
      'X-CorrelationID': uuidv4()
    };
  }

  requestBody(body) {
    this.data = body;
    return this;
  }
}

module.exports = { PerformMerchantPaymentUsingThePollingMethodRequest };
