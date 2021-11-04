/**
 * ViewATransactionRequest
 */
class ViewATransactionRequest {
  constructor(transactionReference) {
    this.url = '/transactions/{transactionReference}';
    this.url = this.url.replace('{transactionReference}', transactionReference);
    this.method = 'get';
    this.headers = {};
  }
}

module.exports = { ViewATransactionRequest };
