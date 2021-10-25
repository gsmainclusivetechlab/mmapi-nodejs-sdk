require('../test_helper');

const client = require('../test_harness').client();

const { CheckForServiceAvailabilityRequest } = mobileMoneyApi.core;

const checkForServiceAvailabilityRequest = async () => {
  const request = new CheckForServiceAvailabilityRequest();

  const response = await client.execute(request);
  return response;
}

describe('Check For Service Availability Request', () => {
  it('should return status 200 with the availability of the service (available, unavailable, degraded) ', async () => {
    const response = await checkForServiceAvailabilityRequest();

    expect(response.status).toBe(200);
    expect(response.data.serviceStatus).toMatch('available');
  });
});

module.exports = {
  CheckForServiceAvailability: checkForServiceAvailabilityRequest
}