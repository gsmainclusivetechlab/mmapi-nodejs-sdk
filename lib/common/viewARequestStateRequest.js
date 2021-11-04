/**
 * View A Request State Request
 */
class ViewARequestStateRequest {
  constructor(serverCorrelationId) {
    this.url = '/requeststates/{serverCorrelationId}';
    this.url = this.url.replace('{serverCorrelationId}', serverCorrelationId);
    this.method = 'get';
    this.headers = {};
  }
}

module.exports = { ViewARequestStateRequest };
