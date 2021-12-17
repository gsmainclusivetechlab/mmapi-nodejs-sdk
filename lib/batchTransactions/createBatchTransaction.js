const { BatchTransaction } = require('./batchTransaction');

const { v4: uuidv4 } = require('uuid');

/**
 * Submit Batch Transaction API
 */
class CreateBatchTransaction extends BatchTransaction {
  constructor() {
    super();
    this.url = '/batchtransactions';
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

module.exports = { CreateBatchTransaction };
