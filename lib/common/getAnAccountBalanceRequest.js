/**
  Get An Account Balance Request
**/

class GetAnAccountBalanceRequest {
  constructor(identifierType, identifier) {
    this.url = '/accounts/{identifierType}/{identifier}/balance';
    this.url = this.url.replace('{identifierType}', identifierType);
    this.url = this.url.replace('{identifier}', identifier);
    this.method = 'get';
    this.headers = {}
  }
}

module.exports = { GetAnAccountBalanceRequest };
