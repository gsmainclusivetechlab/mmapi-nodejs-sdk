const { v4: uuidv4 } = require('uuid');

/**
  Perform A Merchant Payment Reversal Request
**/
class PerformATransactionReversalRequest {
  constructor(originalTransactionReference) {
    this.url = '/transactions/{originalTransactionReference}/reversals';
    this.url = this.url.replace('{originalTransactionReference}', originalTransactionReference);
    this.method = 'post';
    this.data = {
      type: 'reversal',
    };
    this.headers = {
      'Content-Type': 'application/json',
      'X-CorrelationID': uuidv4(),
      'X-Callback-URL': null
    };
  }
}

module.exports = { PerformATransactionReversalRequest };
