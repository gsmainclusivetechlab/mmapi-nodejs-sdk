/**
 * View A Transaction Batch Request
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
