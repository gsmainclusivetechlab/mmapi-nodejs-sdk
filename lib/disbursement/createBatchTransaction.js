const { v4: uuidv4 } = require('uuid');

/**
 * Create A Transaction Batch Request
*/
class CreateBatchTransaction {
  constructor() {
    this.url = '/batchtransactions';
    this.method = 'post';
    this.data = null;
    this.headers = {
      'Content-Type': 'application/json',
      'X-CorrelationID': uuidv4(),
      'X-Callback-URL': null
    }
  }
}

module.exports = { CreateBatchTransaction };
