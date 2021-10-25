require('../test_helper');

const client = require('../test_harness').client();

const { PollToDetermineTheRequestStateRequest } = mobileMoneyApi.merchantPayment;

const { PerformAMerchantPayment } = require('./performAMerchantPaymentRequest.test');

const pollToDetermineTheRequestStateRequest = async () => {
  const request = new PollToDetermineTheRequestStateRequest();
  const { data: { serverCorrelationId } } = await PerformAMerchantPayment();
  request.serverCorrelationId(serverCorrelationId);

  const response = await client.execute(request);

  return response;
}

describe('Poll To Determine The Request State Request', () => {
  it('should return the state of a request with objectReference for a given Server Correlation Id with status 200', async () => {
    const response = await pollToDetermineTheRequestStateRequest();

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('objectReference');
  });
});

module.exports = {
  PollToDetermineTheRequestState: pollToDetermineTheRequestStateRequest
}
