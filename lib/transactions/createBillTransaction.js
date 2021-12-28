const { Transaction } = require('./transaction');

const { v4: uuidv4 } = require('uuid');

/**
 * Create Bill Pay Transaction API
 */
class CreateBillTransaction extends Transaction {
  constructor() {
    super();
    this.url = '/transactions/type/disbursement';
    this.method = 'post';
    this.data = {};
    this.headers = {
      'Content-Type': 'application/json',
      'X-CorrelationID': uuidv4()
    }
  }

  body(body) {
    this.data = body;
    return this;
  }

  polling() {
    delete this.headers['X-Callback-URL'];
    return this;
  }

  callback(xCallbackUrl) {
    this.headers['X-Callback-URL'] = xCallbackUrl;
    return this;
  }
}

module.exports = { CreateBillTransaction };
