/**
  Retrieve Representation Of The Missing Resource
**/
class RetrieveRepresentationOfTheMissingResourceRequest {
  constructor() {
    this.url = null;
    this.method = 'get';
    this.headers = {}
  }

  link(link) {
    this.url = `${link}`;
    return this;
  }
}

module.exports = { RetrieveRepresentationOfTheMissingResourceRequest };
