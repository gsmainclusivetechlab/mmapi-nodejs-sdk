const { buildAccountIdentifiers } = require('../core/serializer');

/**
 * Account Balances API
 */
class ViewAccountBalance {
  constructor(accountIdentifiers = {}) {
    this.url = Object.keys(accountIdentifiers).length >= 1 ? `/accounts/${buildAccountIdentifiers(accountIdentifiers)}/balance` : '/accounts/balance';
    this.method = 'get';
    this.headers = {};
  }
}

module.exports = { ViewAccountBalance };
