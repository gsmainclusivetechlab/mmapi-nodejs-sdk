const { Link } = require('./link');

const { buildAccountIdentifiers } = require('../core/serializer');

const { v4: uuidv4 } = require('uuid');

/**
 * Create Account Link
 */
class CreateAccountLink extends Link {
  constructor(accountIdentifiers) {
    super();
    this.url = `/accounts/${buildAccountIdentifiers(accountIdentifiers)}/links`;
    this.method = 'post';
    this.data = {};
    this.headers = {
      'Content-Type': 'application/json',
      'X-CorrelationID': uuidv4(),
      'X-Callback-URL': null
    };
  }

  polling() {
    delete this.headers['X-Callback-URL'];
    return this;
  }
}

module.exports = { CreateAccountLink };
