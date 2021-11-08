/**
 * View A Resource Request
 */
class ViewAResourceRequest {
  constructor(link) {
    this.url = `${link}`;
    this.method = 'get';
    this.headers = {}
  }
}

module.exports = { ViewAResourceRequest };
