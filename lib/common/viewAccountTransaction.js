/**
 * View Account Specific Transaction Request Via An Account Identifier
 */
class ViewAccountTransaction {
  constructor(identifierType, identifier) {
    this.url = '/accounts/{identifierType}/{identifier}/transactions?'
    this.url = this.url.replace('{identifierType}', identifierType);
    this.url = this.url.replace('{identifier}', identifier);
    this.method = 'get';
    this.headers = {};
    this.params = {};
  }

  offset(offset) {
    this.params['offset'] = offset
    return this;
  }

  limit(limit) {
    this.params['limit'] = limit
    return this;
  }
}

module.exports = { ViewAccountTransaction };
