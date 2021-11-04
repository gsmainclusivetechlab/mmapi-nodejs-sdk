const { v4: uuidv4 } = require('uuid');

/**
 * Create A Merchant Pay Transaction Polling Request
 */
class CreateAMerchantPayTransactionPollingRequest {
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

module.exports = { CreateAMerchantPayTransactionPollingRequest };
