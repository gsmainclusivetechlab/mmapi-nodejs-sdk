/**
  Link Request
**/
class LinkRequest {
  constructor(link) {
    this.url = `${link}`;
    this.method = 'get';
    this.headers = {}
  }
}

module.exports = { LinkRequest };
