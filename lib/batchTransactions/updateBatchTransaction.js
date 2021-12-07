const { BatchTransaction } = require('./batchTransaction');

const { v4: uuidv4 } = require('uuid');

/**
 * Update A Transaction Batch Request
 */
class UpdateBatchTransaction extends BatchTransaction {
  constructor(batchId) {
    super();
    this.url = '/batchtransactions/{batchId}';
    this.url = this.url.replace('{batchId}', batchId);
    this.method = 'patch';
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

module.exports = { UpdateBatchTransaction };
