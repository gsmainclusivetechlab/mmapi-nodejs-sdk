const { v4: uuidv4 } = require('uuid');

/**
 * Create A New Quotation Request
*/
class CreateQuotation {
  constructor() {
    this.url = '/quotations';
    this.method = 'post';
    this.data = null;
    this.headers = {
      'Content-Type': 'application/json',
      'X-CorrelationID': uuidv4(),
      'X-Callback-URL': null
    }
  }
}

module.exports = { CreateQuotation };
