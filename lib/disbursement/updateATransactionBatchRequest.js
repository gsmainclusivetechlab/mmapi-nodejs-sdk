const { v4: uuidv4 } = require('uuid');

/**
 * Update A Transaction Batch Request
 * This endpoint updates a specific transaction batch. Only the batchStatus field can be modified.
*/
class UpdateATransactionBatchRequest {
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
}

module.exports = { UpdateATransactionBatchRequest };
