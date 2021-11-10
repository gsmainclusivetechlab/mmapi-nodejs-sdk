const { v4: uuidv4 } = require('uuid');

/**
 * Create A Int Transfer Transaction Request
*/
class CreateAIntTransferTransactionRequest {
  constructor() {
    this.url = '/transactions/type/inttransfer';
    this.method = 'post';
    this.data = null;
    this.headers = {
      'Content-Type': 'application/json',
      'X-CorrelationID': uuidv4(),
      'X-Callback-URL': null
    }
  }
}

module.exports = { CreateAIntTransferTransactionRequest };
