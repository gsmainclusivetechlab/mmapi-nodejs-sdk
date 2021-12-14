const { Transaction } = require('./transaction');

const { v4: uuidv4 } = require('uuid');

/**
 * Create Refund Transaction API
 */
class CreateRefundTransaction extends Transaction {
  constructor() {
    super();
    this.url = '/transactions/type/adjustment';
    this.method = 'post';
    this.data = {};
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

module.exports = { CreateRefundTransaction };
