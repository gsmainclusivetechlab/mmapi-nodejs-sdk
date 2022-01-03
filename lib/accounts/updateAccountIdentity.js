const { Account } = require('./account');

const { buildAccountIdentifiers } = require('../core/serializer');

const { v4: uuidv4 } = require('uuid');

/**
 * Update Account Identity API
 */
class UpdateAccountIdentity extends Account {
  constructor(accountIdentifiers, identityId) {
    super();
    this.url = `/accounts/${buildAccountIdentifiers(accountIdentifiers)}/identities/${identityId}`;
    this.method = 'patch';
    this.data = [
      {
        "op": "replace",
        "path": "/kycVerificationStatus",
        "value": "verified"
      }
    ];
    this.headers = {
      'Content-Type': 'application/json',
      'X-CorrelationID': uuidv4()
    }
  }

  body(body) {
    this.data = body;
    return this;
  }

  op(op) {
    this.data[0].op = op;
    return this;
  }

  path(path) {
    this.data[0].path = path;
    return this;
  }

  value(value) {
    this.data[0].value = value;
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

module.exports = { UpdateAccountIdentity };
