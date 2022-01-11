const { buildAccountIdentifiers } = require('../core/serializer');

/**
 * View Bill Payment
 */
class ViewBillPayment {
  constructor(accountIdentifiers, billReference) {
    this.url = `/accounts/${buildAccountIdentifiers(accountIdentifiers)}/bills/${billReference}/payments`;
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
}

module.exports = { ViewBillPayment };
