const { v4: uuidv4 } = require('uuid');

/**
 * Create Transfer Transaction
 */
class CreateTransferTransaction {
  constructor() {
    this.url = '/transactions/type/transfer';
    this.method = 'post';
    this.data = null;
    this.headers = {
      'Content-Type': 'application/json',
      'X-CorrelationID': uuidv4(),
      'X-Callback-URL': null
    };
  }

  polling() {
    delete this.headers['X-Callback-URL'];
    return this;
  }
}

module.exports = { CreateTransferTransaction };
