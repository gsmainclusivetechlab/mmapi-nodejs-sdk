/**
 * View A Response API
 */
class ViewResponse {
  constructor(clientCorrelationId) {
    this.url = '/responses/{clientCorrelationId}'
    this.url = this.url.replace('{clientCorrelationId}', clientCorrelationId);
    this.method = 'get';
    this.headers = {};
  }
}

module.exports = { ViewResponse };