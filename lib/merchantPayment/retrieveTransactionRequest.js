/**
  Retrieve A Transaction Request
**/
class RetrieveATransactionRequest {
  constructor() {
    this.url = '/transactions/{transactionReference}';
    this.method = 'get';
    this.headers = {};
  }

  transactionReference(transactionReference) {
    this.url = this.url.replace('{transactionReference}', transactionReference);
    return this;
  }
}

module.exports = { RetrieveATransactionRequest };
