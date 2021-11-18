const { v4: uuidv4 } = require('uuid');

/**
 * View A Quotation
 */
class ViewQuotation {
  constructor(quotationReference) {
    this.url = '/quotations/{quotationReference}';
    this.url = this.url.replace('{quotationReference}', quotationReference);
    this.method = 'get';
    this.headers = {}
  }
}

module.exports = { ViewQuotation };
