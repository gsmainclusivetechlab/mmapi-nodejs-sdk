/**
 * View A Transaction Batch Request
 */
class ViewBatchTransaction {
  constructor(batchId) {
    this.url = '/batchtransactions/{batchId}';
    this.url = this.url.replace('{batchId}', batchId);
    this.method = 'get';
    this.headers = {}
  }
}

module.exports = { ViewBatchTransaction };
