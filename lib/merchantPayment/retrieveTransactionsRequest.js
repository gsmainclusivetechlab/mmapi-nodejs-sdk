/**
  Retrieve A Set Of Transactions For An Account Request
**/
class RetrieveASetOfTransactionsForAnAccountRequest {
  constructor() {
    this.url = '/accounts/{identifierType}/{identifier}/transactions?offset={offset}&limit={limit}'
    this.method = 'get';
    this.headers = {};
  }

  identifierType(identifierType) {
    this.url = this.url.replace('{identifierType}', identifierType);
    return this;
  }

  identifier(identifier) {
    this.url = this.url.replace('{identifier}', identifier);
    return this;
  }

  offset(offset) {
    this.url = this.url.replace('{offset}', offset);
    return this;
  }

  limit(limit) {
    this.url = this.url.replace('{limit}', limit);
    return this;
  }
}

module.exports = { RetrieveASetOfTransactionsForAnAccountRequest };
