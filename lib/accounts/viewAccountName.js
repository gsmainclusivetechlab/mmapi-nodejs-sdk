/**
 * Account Holder Name API
 */
class ViewAccountName {
  constructor(identifierType, identifier) {
    this.url = '/accounts/{identifierType}/{identifier}/accountname';
    this.url = this.url.replace('{identifierType}', identifierType);
    this.url = this.url.replace('{identifier}', identifier);
    this.method = 'get';
    this.headers = {};
  }
}

module.exports = { ViewAccountName };
