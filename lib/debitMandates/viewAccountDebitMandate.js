const { buildAccountIdentifiers } = require('../core/serializer');

/**
 * View Debit Mandate
 */
class ViewAccountDebitMandate {
  constructor(accountIdentifiers, debitMandateReference) {
    this.url = `/accounts/${buildAccountIdentifiers(accountIdentifiers)}/debitmandates/{debitMandateReference}`;
    this.url = this.url.replace('{debitMandateReference}', debitMandateReference);
    this.method = 'get';
    this.headers = {};
  }
}

module.exports = { ViewAccountDebitMandate };
