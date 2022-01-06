const { Account } = require('./account');

const { v4: uuidv4 } = require('uuid');

/**
 * Create Account API
 */
class CreateAccount extends Account {
  constructor() {
    super();
    this.url = '/accounts/individual';
    this.method = 'post';
    this.data = {};
    this.headers = {
      'Content-Type': 'application/json',
      'X-CorrelationID': uuidv4()
    }
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

module.exports = { CreateAccount };
