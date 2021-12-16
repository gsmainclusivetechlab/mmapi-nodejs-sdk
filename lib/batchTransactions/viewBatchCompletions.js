/**
 * Batch Completions API
 */
class ViewBatchCompletions {
  constructor(batchId) {
    this.url = '/batchtransactions/{batchId}/completions';
    this.url = this.url.replace('{batchId}', batchId);
    this.method = 'get';
    this.headers = {};
    this.params = {};
  }

  offset(offset) {
    this.params['offset'] = offset
    return this;
  }

  limit(limit) {
    this.params['limit'] = limit
    return this;
  }

  fromDateTime(fromDateTime) {
    this.params['fromDateTime'] = fromDateTime
    return this;
  }

  toDateTime(toDateTime) {
    this.params['toDateTime'] = toDateTime
    return this;
  }
}

module.exports = { ViewBatchCompletions };
