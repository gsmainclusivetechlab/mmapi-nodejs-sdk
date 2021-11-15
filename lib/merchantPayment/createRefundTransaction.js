const { v4: uuidv4 } = require('uuid');

/**
 * Create A Refund Transaction Request
 */
class CreateRefundTransaction {
  constructor() {
    this.url = '/transactions/type/adjustment';
    this.method = 'post';
    this.data = null;
    this.headers = {
      'Content-Type': 'application/json',
      'X-CorrelationID': uuidv4(),
      'X-Callback-URL': null
    };
  }
}

module.exports = { CreateRefundTransaction };
