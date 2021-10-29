/**
  Retrieve A Transaction Request
**/
class RetrieveATransactionRequest {
  constructor(transactionReference) {
    this.url = '/transactions/{transactionReference}';
    this.url = this.url.replace('{transactionReference}', transactionReference);
    this.method = 'get';
    this.headers = {};
  }
}

module.exports = { RetrieveATransactionRequest };
