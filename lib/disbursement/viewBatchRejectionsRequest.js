/**
 * View Batch Rejections Request
 */
class ViewBatchRejectionsRequest {
  constructor(batchId) {
    this.url = '/batchtransactions/{batchId}/rejections';
    this.url = this.url.replace('{batchId}', batchId);
    this.method = 'get';
    this.headers = {}
  }
}

module.exports = { ViewBatchRejectionsRequest };
