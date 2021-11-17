/**
* Check Api Availability Request
* This endpoint returns the current status of the API
*/
class ViewServiceAvailability {
  constructor() {
    this.url = '/heartbeat';
    this.method = 'get';
    this.headers = {};
  }
}

module.exports = { ViewServiceAvailability };