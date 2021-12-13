const { buildAccountIdentifiers } = require('../core/serializer');

/**
 * View Account Link
 */
class ViewAccountLink {
  constructor(accountIdentifiers, linkReference) {
    this.url = `/accounts/${buildAccountIdentifiers(accountIdentifiers)}/links/{linkReference}`;
    this.url = this.url.replace('{linkReference}', linkReference);
    this.method = 'get';
    this.headers = {};
  }
}

module.exports = { ViewAccountLink };
