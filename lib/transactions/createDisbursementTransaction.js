const { Transaction } = require('./transaction');

const { v4: uuidv4 } = require('uuid');

/**
 * Create Disbursement Transaction API
 */
class CreateDisbursementTransaction extends Transaction {
  constructor() {
    super();
    this.url = '/transactions/type/disbursement';
    this.method = 'post';
    this.data = {};
    this.headers = {
      'Content-Type': 'application/json',
      'X-CorrelationID': uuidv4(),
      'X-Callback-URL': null
    }
  }

  polling() {
    delete this.headers['X-Callback-URL'];
    return this;
  }
}

module.exports = { CreateDisbursementTransaction };
