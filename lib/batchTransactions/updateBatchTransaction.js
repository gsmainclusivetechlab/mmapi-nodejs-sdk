const { v4: uuidv4 } = require('uuid');

/**
 * Update A Transaction Batch Request
 */
class UpdateBatchTransaction {
  constructor(batchId) {
    this.url = '/batchtransactions/{batchId}';
    this.url = this.url.replace('{batchId}', batchId);
    this.method = 'patch';
    this.data = [
      {
        "op": "replace",
        "path": "/batchStatus",
        "value": "approved"
      }
    ];
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

module.exports = { UpdateBatchTransaction };
