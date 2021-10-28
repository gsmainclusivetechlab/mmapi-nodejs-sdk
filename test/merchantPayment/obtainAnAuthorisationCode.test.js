require('../test_helper');

const client = require('../test_harness').client();

const { ObtainAnAuthorisationCodeRequest } = mobileMoneyApi.merchantPayment;

const buildRequestBody = () => ({ "requestDate": "2018-07-03T10:43:27.405Z", "currency": "GBP", "amount": "1000.00" });

const obtainAnAuthorisationCode = async () => {
  const request = new ObtainAnAuthorisationCodeRequest('accountid', 2000);
  request.data = buildRequestBody();

  const response = await client.execute(request);

  return response;
}

describe('Obtain An Authorisation Code Request', () => {
  it('should return the request state object with status 202 pending', async () => {
    const response = await obtainAnAuthorisationCode();

    expect(response.status).toBe(202);
    expect(response.data.status).toBe('pending');
  });
});

module.exports = {
  obtainAnAuthorisationCode: obtainAnAuthorisationCode
}