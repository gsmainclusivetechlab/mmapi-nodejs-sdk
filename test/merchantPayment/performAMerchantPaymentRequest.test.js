require('../test_helper');

const client = require('../test_harness').client();

const { PerformAMerchantPaymentRequest } = mobileMoneyApi.merchantPayment;

const buildRequestBody = () => ({
  amount: '200.00',
  creditParty: [
    {
      key: 'accountid',
      value: '2999',
    },
  ],
  currency: 'RWF',
  debitParty: [
    {
      key: 'accountid',
      value: '2999',
    },
  ],
});

buildXCallbackURL = () => 'https://www.example.com';

const performAMerchantPaymentRequest = async () => {
  const request = new PerformAMerchantPaymentRequest();
  request.xCallbackURL(buildXCallbackURL());
  request.requestBody(buildRequestBody());

  const response = await client.execute(request);

  return response;
}

describe('Perform A Merchant Payment Request', () => {
  it('should return the request state object to indicate that the request is pending', async () => {
    const response = await performAMerchantPaymentRequest();

    expect(response.status).toBe(202);
    expect(response.data).toHaveProperty('status');
    expect(response.data.status).toBe('pending');
    expect(response.data).toHaveProperty('serverCorrelationId');
  });
});

module.exports = {
  PerformAMerchantPayment: performAMerchantPaymentRequest,
}


