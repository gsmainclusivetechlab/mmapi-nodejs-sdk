const { buildAccountIdentifiers } = require('../core/serializer');

const { BillPayment } = require('./billPayment');

const { v4: uuidv4 } = require('uuid');

/**
 * Create Bill Payment
 */
class CreateBillPayment extends BillPayment {
  constructor(accountIdentifiers, billReference) {
    super();
    this.url = `/accounts/${buildAccountIdentifiers(accountIdentifiers)}/bills/${billReference}/payments`;
    this.method = 'post';
    this.data = {};
    this.headers = {
      'Content-Type': 'application/json',
      'X-CorrelationID': uuidv4()
    }
  }

  body(body) {
    this.data = body;
    return this;
  }

  polling() {
    delete this.headers['X-Callback-URL'];
    return this;
  }

  callback(xCallbackUrl) {
    this.headers['X-Callback-URL'] = xCallbackUrl;
    return this;
  }
}

module.exports = { CreateBillPayment };
