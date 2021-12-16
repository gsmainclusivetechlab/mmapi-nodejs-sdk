/**
 * View A Quotation API
 */
class ViewQuotation {
  constructor(quotationReference) {
    this.url = '/quotations/{quotationReference}';
    this.url = this.url.replace('{quotationReference}', quotationReference);
    this.method = 'get';
    this.headers = {};
  }
}

module.exports = { ViewQuotation };
