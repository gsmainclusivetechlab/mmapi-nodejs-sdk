const { DebitMandate } = require('./debitMandate');

const { buildAccountIdentifiers } = require('../core/serializer');

const { v4: uuidv4 } = require('uuid');

/**
 * Create Account Debit Mandate
 */
class CreateAccountDebitMandate extends DebitMandate {
  constructor(accountIdentifiers) {
    super();
    this.url = `/accounts/${buildAccountIdentifiers(accountIdentifiers)}/debitmandates`;
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
