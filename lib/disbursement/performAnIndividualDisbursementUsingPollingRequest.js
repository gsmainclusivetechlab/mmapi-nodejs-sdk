const { v4: uuidv4 } = require('uuid');

/**
 * Perform An Individual Disbursement Using Polling
*/
class PerformAnIndividualDisbursementUsingPollingRequest {
  constructor() {
    this.url = '/transactions/type/disbursement';
    this.method = 'post';
    this.data = null;
    this.headers = {
      'Content-Type': 'application/json',
      'X-CorrelationID': uuidv4(),
    }
  }
}

module.exports = { PerformAnIndividualDisbursementUsingPollingRequest };
