const { v4: uuidv4 } = require('uuid');

/**
 * Update A Transaction Batch Request
 */
class UpdateBatchTransaction {
  constructor(batchId) {
    this.url = '/batchtransactions/{batchId}';
    this.url = this.url.replace('{batchId}', batchId);
    this.method = 'patch';
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
