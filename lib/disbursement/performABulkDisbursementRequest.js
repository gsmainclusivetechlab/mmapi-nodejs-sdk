const { v4: uuidv4 } = require('uuid');

/**
 * Perform A Bulk Disbursement
*/
class PerformABulkDisbursementRequest {
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

module.exports = { PerformABulkDisbursementRequest };
