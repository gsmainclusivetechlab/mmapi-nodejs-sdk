/**
  Retrieve A Set Of Transactions For An Account Request
**/
class RetrieveASetOfTransactionsForAnAccountRequest {
  constructor(identifierType, identifier) {
    this.url = '/accounts/{identifierType}/{identifier}/transactions'
    this.url = this.url.replace('{identifierType}', identifierType);
    this.url = this.url.replace('{identifier}', identifier);
    this.method = 'get';
    this.headers = {};
  }

  queryParams(offset, limit) {
    const params = new URLSearchParams({ offset, limit });
    this.url = this.url.concat(`?${params.toString()}`);
    return this;
  }
}

module.exports = { RetrieveASetOfTransactionsForAnAccountRequest };
