require('../test_helper');

const client = require('../test_harness').client();

const { PollToDetermineTheRequestStateRequest } = mobileMoneyApi.common;

const { performAMerchantPayment } = require('../merchantPayment/performAMerchantPayment.test');

const pollToDetermineTheRequestState = async () => {
  const { data: { serverCorrelationId } } = await performAMerchantPayment();
  const request = new PollToDetermineTheRequestStateRequest(serverCorrelationId);

  const response = await client.execute(request);

  return response;
}

describe('Poll To Determine The Request State Request', () => {
  it('should return the state of a request with objectReference for a given Server Correlation Id with status 200', async () => {
    const response = await pollToDetermineTheRequestState();

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('objectReference');
  });
});

module.exports = {
  pollToDetermineTheRequestState: pollToDetermineTheRequestState
}
