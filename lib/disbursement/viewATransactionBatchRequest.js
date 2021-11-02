/**
 * View A Transaction Batch Request
 * This endpoint returns the current status of a batch transaction
*/
class ViewATransactionBatchRequest {
  constructor(batchId) {
    this.url = '/batchtransactions/{batchId}';
    this.url = this.url.replace('{batchId}', batchId);
    this.method = 'get';
    this.headers = {}
  }
}

module.exports = { ViewATransactionBatchRequest };
