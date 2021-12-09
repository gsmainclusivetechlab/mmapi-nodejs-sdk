/**
 * Retrieving Transactions for an Account
 */
class ViewAccountTransactions {
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

  fromDateTime(fromDateTime) {
    this.params['fromDateTime'] = fromDateTime
    return this;
  }

  toDateTime(toDateTime) {
    this.params['toDateTime'] = toDateTime
    return this;
  }

  transactionStatus(transactionStatus) {
    this.params['transactionStatus'] = transactionStatus
    return this;
  }

  transactionType(transactionType) {
    this.params['transactionType'] = transactionType
    return this;
  }
}

module.exports = { ViewAccountTransactions };
