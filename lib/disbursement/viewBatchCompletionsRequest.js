/**
 * View Batch Completions Request
*/
class ViewBatchCompletionsRequest {
  constructor(batchId) {
    this.url = '/batchtransactions/{batchId}/completions';
    this.url = this.url.replace('{batchId}', batchId);
    this.method = 'get';
    this.headers = {}
  }
}

module.exports = { ViewBatchCompletionsRequest };
