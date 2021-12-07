const { DebitMandate } = require('./debitMandate');

const { v4: uuidv4 } = require('uuid');

/**
 * Create Account Debit Mandate
*/
class CreateAccountDebitMandate extends DebitMandate {
  constructor(identifierType, identifier) {
    super();
    this.url = '/accounts/{identifierType}/{identifier}/debitmandates';
    this.url = this.url.replace('{identifierType}', identifierType);
    this.url = this.url.replace('{identifier}', identifier);
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

module.exports = { CreateAccountDebitMandate };
