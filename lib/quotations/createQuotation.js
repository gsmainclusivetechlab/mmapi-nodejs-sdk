const { Quotation } = require('./quotation');

const { v4: uuidv4 } = require('uuid');

/**
 * Create Quotation API
 */
class CreateQuotation extends Quotation {
  constructor() {
    super();
    this.url = '/quotations';
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

module.exports = { CreateQuotation };
