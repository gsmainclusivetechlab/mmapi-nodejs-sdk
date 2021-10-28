require('../test_helper');

const client = require('../test_harness').client();

const { PerformAMerchantPaymentRequest } = mobileMoneyApi.merchantPayment;
const { RetrieveAMissingResponseRequest } = mobileMoneyApi.common;

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

let clientCorrelationId;

const performAMerchantPayment = async () => {
  const request = new PerformAMerchantPaymentRequest();
  clientCorrelationId = request.headers['X-CorrelationID'];
  request.data = buildRequestBody();

  const response = await client.execute(request);

  return response;
}

const retrieveAMissingResponse = async () => {
  await performAMerchantPayment();
  const request = new RetrieveAMissingResponseRequest(clientCorrelationId);

  const response = await client.execute(request);
  return response;
}

describe('Retrieve A Missing Response Request', () => {
  it('should return a response object containing a link to the missing resource', async () => {
    const response = await retrieveAMissingResponse();

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('link');
  });
});

module.exports = {
  retrieveAMissingResponse: retrieveAMissingResponse
}