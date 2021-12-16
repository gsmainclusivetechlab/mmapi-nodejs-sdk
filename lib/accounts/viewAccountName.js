const { buildAccountIdentifiers } = require('../core/serializer');

/**
 * Account Holder Name API
 */
class ViewAccountName {
  constructor(accountIdentifiers) {
    this.url = `/accounts/${buildAccountIdentifiers(accountIdentifiers)}/accountname`;
    this.method = 'get';
    this.headers = {};
  }
}

module.exports = { ViewAccountName };
