/**
 * Retrieve Batch Transactions That Have Completed
*/
class RetrieveBatchTransactionsThatHaveCompletedRequest {
  constructor(batchId) {
    this.url = '/batchtransactions/{batchId}/completions';
    this.url = this.url.replace('{batchId}', batchId);
    this.method = 'get';
    this.headers = {}
  }
}

module.exports = { RetrieveBatchTransactionsThatHaveCompletedRequest };
