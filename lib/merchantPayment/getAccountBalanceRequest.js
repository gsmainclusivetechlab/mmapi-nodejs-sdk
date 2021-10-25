/**
  Get An Account Balance Request
**/

class GetAnAccountBalanceRequest {
  constructor() {
    this.url = '/accounts/{identifierType}/{identifier}/balance';
    this.method = 'get';
    this.headers = {}
  }

  identifierType(identifierType) {
    this.url = this.url.replace('{identifierType}', identifierType);
    return this;
  }

  identifier(identifier) {
    this.url = this.url.replace('{identifier}', identifier);
    return this;
  }
}

module.exports = { GetAnAccountBalanceRequest };
