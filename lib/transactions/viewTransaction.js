/**
 * View Transaction API
 */
class ViewTransaction {
  constructor(transactionReference) {
    this.url = '/transactions/{transactionReference}';
    this.url = this.url.replace('{transactionReference}', transactionReference);
    this.method = 'get';
    this.headers = {};
  }
}

module.exports = { ViewTransaction };
