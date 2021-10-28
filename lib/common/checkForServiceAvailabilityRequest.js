/**
  Check For Service Availability Request
**/
class CheckForServiceAvailabilityRequest {
  constructor() {
    this.url = '/heartbeat';
    this.method = 'get';
    this.headers = {};
  }
}

module.exports = { CheckForServiceAvailabilityRequest };