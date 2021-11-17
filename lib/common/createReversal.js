const { v4: uuidv4 } = require('uuid');

/**
  Create A Reversal Request
**/
class CreateReversal {
  constructor(transactionReference) {
    this.url = '/transactions/{transactionReference}/reversals';
    this.url = this.url.replace('{transactionReference}', transactionReference);
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

module.exports = { CreateReversal };
