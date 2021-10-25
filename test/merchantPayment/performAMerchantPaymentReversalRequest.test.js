require('../test_helper');

const client = require('../test_harness').client();

const { PerformAMerchantPaymentReversalRequest } = mobileMoneyApi.merchantPayment;

const { PollToDetermineTheRequestState } = require('./pollToDetermineTheRequestStateRequest.test')

buildXCallbackURL = () => 'https://www.example.com';

const performAMerchantPaymentReversalRequest = async () => {
  const request = new PerformAMerchantPaymentReversalRequest();
  request.xCallbackURL(buildXCallbackURL());
  const { data: { objectReference } } = await PollToDetermineTheRequestState();
  request.originalTransactionReference(objectReference);

  const response = await client.execute(request);

  return response;
}

describe('Perform A Merchant Payment Reversal Request', () => {
  it('should return the request state object to indicate that the request is pending', async () => {
    const response = await performAMerchantPaymentReversalRequest();

    expect(response.status).toBe(202);
    expect(response.data).toHaveProperty('status');
    expect(response.data.status).toBe('pending');
  });
});

module.exports = {
  PerformAMerchantPaymentReversal: performAMerchantPaymentReversalRequest
}