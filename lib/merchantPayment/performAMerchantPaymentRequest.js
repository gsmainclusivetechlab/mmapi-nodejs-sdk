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
    };
  }

  xCorrelationID(xCorrelationID) {
    this.headers['X-CorrelationID'] = xCorrelationID;
    return this;
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
