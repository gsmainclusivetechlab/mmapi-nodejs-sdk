require('../test_helper');

const client = require('../test_harness').client();

const { RetrieveAMissingApiResponseRequest, PerformAMerchantPaymentRequest } = mobileMoneyApi.merchantPayment;

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

let clientCorrelationId;

const performAMerchantPaymentRequest = async () => {
  const request = new PerformAMerchantPaymentRequest();
  clientCorrelationId = request.headers['X-CorrelationID'];
  request.xCallbackURL(buildXCallbackURL());
  request.requestBody(buildRequestBody());

  const response = await client.execute(request);

  return response;
}

const retrieveAMissingApiResponseRequest = async () => {
  const request = new RetrieveAMissingApiResponseRequest();
  await performAMerchantPaymentRequest();
  request.clientCorrelationId(clientCorrelationId);

  const response = await client.execute(request);
  return response;
}

describe('Retrieve A Missing Api Response Request', () => {
  it('should return a response object containing a link to the missing resource', async () => {
    const response = await retrieveAMissingApiResponseRequest();

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('link');
  });
});

module.exports = {
  RetrieveAMissingApiResponse: retrieveAMissingApiResponseRequest
}