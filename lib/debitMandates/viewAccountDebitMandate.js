const { v4: uuidv4 } = require('uuid');

/**
 * View Account Debit Mandate
 */
class ViewAccountDebitMandate {
  constructor(identifierType, identifier, debitMandateReference) {
    this.url = '/accounts/{identifierType}/{identifier}/debitmandates/{debitMandateReference}';
    this.url = this.url.replace('{identifierType}', identifierType);
    this.url = this.url.replace('{identifier}', identifier);
    this.url = this.url.replace('{debitMandateReference}', debitMandateReference);
    this.method = 'get';
    this.headers = {}
  }
}

module.exports = { ViewAccountDebitMandate };
