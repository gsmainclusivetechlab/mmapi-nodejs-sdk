require('../test_helper');

const client = require('../test_harness').client();

const { CheckApiAvailabilityRequest } = mobileMoneyApi.common;

const checkApiAvailability = async () => {
  const request = new CheckApiAvailabilityRequest();

  const response = await client.execute(request);

  return response;
}

describe('Check Api Availability', () => {
  it('should return status 200 with the availability of the service (available, unavailable, degraded)', async () => {
    const response = await checkApiAvailability();

    expect(response.status).toBe(200);
    expect(response.data.serviceStatus).toMatch(/^(available|unavailable|degraded)$/);
  });
});

module.exports = {
  checkApiAvailability
}