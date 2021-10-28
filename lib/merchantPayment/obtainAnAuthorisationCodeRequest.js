const { v4: uuidv4 } = require('uuid');

/**
  Obtain An Authorisation Code Request
**/
class ObtainAnAuthorisationCodeRequest {
  constructor(identifierType, identifier) {
    this.url = '/accounts/{identifierType}/{identifier}/authorisationcodes';
    this.url = this.url.replace('{identifierType}', identifierType);
    this.url = this.url.replace('{identifier}', identifier);
    this.method = 'post';
    this.data = null;
    this.headers = {
      'Content-Type': 'application/json',
      'X-CorrelationID': uuidv4(),
      'X-Callback-URL': null
    };
  }
}

module.exports = { ObtainAnAuthorisationCodeRequest };
