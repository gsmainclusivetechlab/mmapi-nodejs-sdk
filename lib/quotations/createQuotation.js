const { Quotation } = require('./quotation');

const { v4: uuidv4 } = require('uuid');

/**
 * Create A New Quotation Request
 */
class CreateQuotation extends Quotation {
  constructor() {
    super();
    this.url = '/quotations';
    this.method = 'post';
    this.data = {};
    this.headers = {
      'Content-Type': 'application/json',
      'X-CorrelationID': uuidv4(),
      'X-Callback-URL': null
    }
  }

  polling() {
    delete this.headers['X-Callback-URL'];
    return this;
  }
}

module.exports = { CreateQuotation };
