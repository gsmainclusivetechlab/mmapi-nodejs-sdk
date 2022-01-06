const { buildAccountIdentifiers } = require('../core/serializer');

/**
 * View Account API
 */
class ViewAccount {
  constructor(accountIdentifiers) {
    this.url = `/accounts/${buildAccountIdentifiers(accountIdentifiers)}`;
    this.method = 'get';
    this.headers = {};
  }
}

module.exports = { ViewAccount };
