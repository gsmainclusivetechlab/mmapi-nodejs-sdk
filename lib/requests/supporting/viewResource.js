/**
 * View A Resource Request
 */
class ViewResource {
  constructor(link) {
    this.url = `${link}`;
    this.method = 'get';
    this.headers = {}
  }
}

module.exports = { ViewResource };
