const { Reversal } = require('./reversal');

const { v4: uuidv4 } = require('uuid');

/**
 * Create Reversal API
 */
class CreateReversal extends Reversal {
  constructor(originalTransactionReference) {
    super();
    this.url = '/transactions/{originalTransactionReference}/reversals';
    this.url = this.url.replace('{originalTransactionReference}', originalTransactionReference);
    this.method = 'post';
    this.data = {};
    this.headers = {
      'Content-Type': 'application/json',
      'X-CorrelationID': uuidv4()
    };
  }

  body(body) {
    this.data = body;
    return this;
  }

  polling() {
    delete this.headers['X-Callback-URL'];
    return this;
  }

  callback(xCallbackUrl) {
    this.headers['X-Callback-URL'] = xCallbackUrl;
    return this;
  }
}

module.exports = { CreateReversal };
