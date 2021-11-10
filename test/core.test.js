require('./test_helper');

const environment = require('./test_harness').environment();
const client = require('./test_harness').client();

const { ObtainAnAccessTokenRequest } = mobileMoneyApi.core;

describe('Obtain An Access Token Request', () => {
  it('Should return an access token if valid consumer key and consumer secret is sent via the authorization header', async () => {
    const request = new ObtainAnAccessTokenRequest(environment);

    const response = await client.execute(request);

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('access_token');
    expect(response.data).toHaveProperty('expires_in');
  });
});



