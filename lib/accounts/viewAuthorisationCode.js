/**
 * View Authorisation Code
 */
class ViewAuthorisationCode {
  constructor(identifierType, identifier, authorisationCode) {
    this.url = '/accounts/{identifierType}/{identifier}/authorisationcodes/{authorisationCode}';
    this.url = this.url.replace('{identifierType}', identifierType);
    this.url = this.url.replace('{identifier}', identifier);
    this.url = this.url.replace('{authorisationCode}', authorisationCode);
    this.method = 'get';
    this.headers = {};
  }
}

module.exports = { ViewAuthorisationCode };
