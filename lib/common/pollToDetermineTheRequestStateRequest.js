/**
  Poll To Determine The Request State Request
**/
class PollToDetermineTheRequestStateRequest {
  constructor(serverCorrelationId) {
    this.url = '/requeststates/{serverCorrelationId}';
    this.url = this.url.replace('{serverCorrelationId}', serverCorrelationId);
    this.method = 'get';
    this.headers = {};
  }
}

module.exports = { PollToDetermineTheRequestStateRequest };
