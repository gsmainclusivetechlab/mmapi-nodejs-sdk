const { v4: uuidv4 } = require('uuid');

/**
 * Retrieve Batch Transactions That Have Been Completed
*/
class RetrieveBatchTransactionsThatHaveBeenRejectedRequest {
  constructor(batchId) {
    this.url = '/batchtransactions/{batchId}/rejections';
    this.url = this.url.replace('{batchId}', batchId);
    this.method = 'get';
    this.headers = {}
  }
}

module.exports = { RetrieveBatchTransactionsThatHaveBeenRejectedRequest };
