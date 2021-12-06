const { AuthorisationCode } = require('./authorisationCode');

const { v4: uuidv4 } = require('uuid');

/**
 * Create An Authorisation Code Via An Account Identifier Request
 */
class CreateAuthorisationCode extends AuthorisationCode {
  constructor(identifierType, identifier) {
    super();
    this.url = '/accounts/{identifierType}/{identifier}/authorisationcodes';
    this.url = this.url.replace('{identifierType}', identifierType);
    this.url = this.url.replace('{identifier}', identifier);
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
