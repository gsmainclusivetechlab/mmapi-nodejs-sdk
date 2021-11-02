/**
* Check Api Availability Request
* This endpoint returns the current status of the API
*/
class CheckApiAvailabilityRequest {
  constructor() {
    this.url = '/heartbeat';
    this.method = 'get';
    this.headers = {};
  }
}

module.exports = { CheckApiAvailabilityRequest };