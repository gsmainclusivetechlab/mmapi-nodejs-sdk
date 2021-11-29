/**
 * View Account Link
 */
class ViewAccountLink {
  constructor(identifierType, identifier, linkReference) {
    this.url = '/accounts/{identifierType}/{identifier}/links/{linkReference}';
    this.url = this.url.replace('{identifierType}', identifierType);
    this.url = this.url.replace('{identifier}', identifier);
    this.url = this.url.replace('{linkReference}', linkReference);
    this.method = 'get';
    this.headers = {};
  }
}

module.exports = { ViewAccountLink };
