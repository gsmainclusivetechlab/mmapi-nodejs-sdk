const { buildAccountIdentifiers } = require('../core/serializer');

const { AuthorisationCode } = require('./authorisationCode');

const { v4: uuidv4 } = require('uuid');

/**
 * Generate Authorisation Codes API
 */
class CreateAuthorisationCode extends AuthorisationCode {
  constructor(accountIdentifiers) {
    super();
    this.url = `/accounts/${buildAccountIdentifiers(accountIdentifiers)}/authorisationcodes`;
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

module.exports = { CreateAuthorisationCode };
