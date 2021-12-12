const { buildAccountIdentifiers } = require('../core/serializer');

/**
 * View Authorisation Codes API
 */
class ViewAuthorisationCode {
  constructor(accountIdentifiers, authorisationCode) {
    this.url = `/accounts/${buildAccountIdentifiers(accountIdentifiers)}/authorisationcodes/{authorisationCode}`;
    this.url = this.url.replace('{authorisationCode}', authorisationCode);
    this.method = 'get';
    this.headers = {};
  }
}

module.exports = { ViewAuthorisationCode };
