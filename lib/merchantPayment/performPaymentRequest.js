const { v4: uuidv4 } = require('uuid');

/**
  Perform A Merchant Payment Request
**/
class PerformAMerchantPaymentRequest {
  constructor() {
    this.url = '/transactions/type/merchantpay';
    this.method = 'post';
    this.data = null;
    this.headers = {
      'Content-Type': 'application/json',
      'X-CorrelationID': uuidv4()
    };
  }

  xCallbackURL(xCallbackURL) {
    this.headers['X-Callback-URL'] = xCallbackURL;
    return this;
  }

  requestBody(body) {
    this.data = body;
    return this;
  }

}

module.exports = { PerformAMerchantPaymentRequest };
