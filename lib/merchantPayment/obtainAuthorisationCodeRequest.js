const { v4: uuidv4 } = require('uuid');

/**
  Obtain An Authorisation Code Request
**/
class ObtainAnAuthorisationCodeRequest {
  constructor() {
    this.url = '/accounts/{identifierType}/{identifier}/authorisationcodes';
    this.method = 'post';
    this.data = null;
    this.headers = {
      'Content-Type': 'application/json',
      'X-CorrelationID': uuidv4()
    };
  }

  identifierType(identifierType) {
    this.url = this.url.replace('{identifierType}', identifierType);
    return this;
  }

  identifier(identifier) {
    this.url = this.url.replace('{identifier}', identifier);
    return this;
  }

  xCallbackURL(xCallbackURL) {
    this.headers['X-Callback-URL'] = xCallbackURL;
    return this;
  }

  requestBody(body) {
    this.data = body;
    return this;
  }
}

module.exports = { ObtainAnAuthorisationCodeRequest };
