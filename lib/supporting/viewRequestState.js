/**
 * View A Request State API
 */
class ViewRequestState {
  constructor(serverCorrelationId) {
    this.url = '/requeststates/{serverCorrelationId}';
    this.url = this.url.replace('{serverCorrelationId}', serverCorrelationId);
    this.method = 'get';
    this.headers = {};
  }
}

module.exports = { ViewRequestState };
