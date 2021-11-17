const { v4: uuidv4 } = require('uuid');

/**
 * Perform An Individual Disbursement
*/
class CreateDisbursementTransaction {
  constructor() {
    this.url = '/transactions/type/disbursement';
    this.method = 'post';
    this.data = null;
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

module.exports = { CreateDisbursementTransaction };
