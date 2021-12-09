const { identifyAccount } = require('../core/serializer');

/**
 * Account Balances API
 */
class ViewAccountBalance {
  constructor(accountIdentifiers) {
    const count = Object.keys(accountIdentifiers).length;
    if (count >= 1) {
      this.url = `/accounts/${identifyAccount(accountIdentifiers)}/balance`;
    } else {
      this.url = '/accounts/balance';
    }
    this.method = 'get';
    this.headers = {};
  }
}

module.exports = { ViewAccountBalance };
