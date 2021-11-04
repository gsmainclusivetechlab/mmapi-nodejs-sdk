const { v4: uuidv4 } = require('uuid');

/**
 * Create A Merchant Pay Transaction Request
 * Provided with a valid object representation, this endpoint allows for a new transaction to be created for a given transaction type passed via the URL.
 */
class CreateAMerchantPayTransactionRequest {
  constructor() {
    this.url = '/transactions/type/merchantpay';
    this.method = 'post';
    this.data = null;
    this.headers = {
      'Content-Type': 'application/json',
      'X-CorrelationID': uuidv4(),
      'X-Callback-URL': null
    };
  }
}

module.exports = { CreateAMerchantPayTransactionRequest };
