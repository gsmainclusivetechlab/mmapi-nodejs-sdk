require('../test_helper');

const client = require('../test_harness').client();

const { ObtainAnAuthorisationCodeRequest } = mobileMoneyApi.merchantPayment;

const buildRequestBody = () => ({
  requestDate: '2018-07-03T10:43:27.405Z',
  currency: 'GBP',
  amount: '1000.00',
});

buildXCallbackURL = () => 'https://www.example.com';

const obtainAnAuthorisationCodeRequest = async () => {
  const request = new ObtainAnAuthorisationCodeRequest();
  request.xCallbackURL(buildXCallbackURL());
  request.identifierType('accountid');
  request.identifier(2000);
  request.requestBody(buildRequestBody());

  const response = await client.execute(request);

  return response;
}

describe('Obtain An Authorisation Code Request', () => {
  it('should return the request state object with status 202 pending', async () => {
    const response = await obtainAnAuthorisationCodeRequest();

    expect(response.status).toBe(202);
    expect(response.data.status).toBe('pending');
  });
});

module.exports = {
  ObtainAnAuthorisationCode: obtainAnAuthorisationCodeRequest
}