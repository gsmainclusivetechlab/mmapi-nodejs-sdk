/**
  Retrieve A Missing Api Response Request
**/

class RetrieveAMissingApiResponseRequest {
  constructor() {
    this.url = '/responses/{clientCorrelationId}'
    this.method = 'get';
    this.headers = {};
  }

  clientCorrelationId(clientCorrelationId) {
    this.url = this.url.replace('{clientCorrelationId}', clientCorrelationId);
    return this;
  }

}
module.exports = { RetrieveAMissingApiResponseRequest };