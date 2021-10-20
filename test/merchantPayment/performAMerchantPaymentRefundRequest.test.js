require('../test_helper');

const client = require('../test_harness').client();

const { PerformAMerchantPaymentRefundRequest } = mobileMoneyApi.merchantPayment;

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

const performAMerchantPaymentRefundRequest = async () => {
  const request = new PerformAMerchantPaymentRefundRequest();
  request.xCallbackURL(buildXCallbackURL());
  request.requestBody(buildRequestBody());

  const response = await client.execute(request);

  return response;
}

describe('Merchant Payment Refund Request', () => {
  it('should return the request state object to indicate that the request is pending', async () => {
    const response = await performAMerchantPaymentRefundRequest();

    expect(response.status).toBe(202);
    expect(response.data).toHaveProperty('status');
    expect(response.data.status).toBe('pending');
  });
});

module.exports = {
  PerformAMerchantPaymentRefund: performAMerchantPaymentRefundRequest
}
