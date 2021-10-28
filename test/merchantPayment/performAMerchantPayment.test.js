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

const performAMerchantPayment = async () => {
  const request = new PerformAMerchantPaymentRequest();
  request.data = buildRequestBody();
  request.headers['X-Callback-URL'] = buildXCallbackURL();

  const response = await client.execute(request);

  return response;
}

describe('Perform A Merchant Payment Request', () => {
  it('should return the request state object to indicate that the request is pending', async () => {
    const response = await performAMerchantPayment();

    expect(response.status).toBe(202);
    expect(response.data).toHaveProperty('status');
    expect(response.data.status).toBe('pending');
    expect(response.data).toHaveProperty('serverCorrelationId');
  });
});

module.exports = {
  performAMerchantPayment: performAMerchantPayment,
}


