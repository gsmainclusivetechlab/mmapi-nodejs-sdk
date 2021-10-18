/* eslint-disable no-magic-numbers */
/* eslint-disable no-undef */
require('../test_helper');

const environment = require('../test_harness').environment();
const client = require('../test_harness').client();

const { ObtainAnAccessTokenRequest } = mobileMoneyApi.core;

const obtainAnAccessToken = async () => {
  const request = new ObtainAnAccessTokenRequest(environment);

  const response = await client.execute(request);

  return response;
};

describe('Obtain An Access Token Request', () => {
  it('Should return an access token if valid consumer key and consumer secret is sent via the authorization header', async () => {
    const response = await obtainAnAccessToken();

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('access_token');
    expect(response.data).toHaveProperty('expires_in');
  });
});

module.exports = {
  ObtainAnAccessToken: obtainAnAccessToken,
};