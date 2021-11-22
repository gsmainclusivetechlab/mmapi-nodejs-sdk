const {
  obtainAnAccessToken
} = require('../samples/index')

describe('Obtain An Access Token Request', () => {
  it('Should return an access token if valid consumer key and consumer secret is sent via the authorization header', async () => {
    const response = await obtainAnAccessToken();

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('access_token');
    expect(response.data).toHaveProperty('expires_in');
  });
});



