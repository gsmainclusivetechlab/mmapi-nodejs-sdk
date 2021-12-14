/**
 * Check Api Availability API
 */
class ViewServiceAvailability {
  constructor() {
    this.url = '/heartbeat';
    this.method = 'get';
    this.headers = {};
  }
}

module.exports = { ViewServiceAvailability };