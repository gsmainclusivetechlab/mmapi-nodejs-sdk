/**
  Retrieve A Missing Response Request
**/
class RetrieveAMissingResponseRequest {
  constructor(clientCorrelationId) {
    this.url = '/responses/{clientCorrelationId}'
    this.url = this.url.replace('{clientCorrelationId}', clientCorrelationId);
    this.method = 'get';
    this.headers = {};
  }
}

module.exports = { RetrieveAMissingResponseRequest };