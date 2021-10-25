/**
  Poll To Determine The Request State Request
**/
class PollToDetermineTheRequestStateRequest {
  constructor() {
    this.url = '/requeststates/{serverCorrelationId}';
    this.method = 'get';
    this.headers = {};
  }

  serverCorrelationId(serverCorrelationId) {
    this.url = this.url.replace('{serverCorrelationId}', serverCorrelationId);
    return this;
  }
}

module.exports = { PollToDetermineTheRequestStateRequest };
