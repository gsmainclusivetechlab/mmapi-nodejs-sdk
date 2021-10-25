const { FormEncoded } = require('./serializer');

/**
 * An OAuth2 client credentials grant access token request
 */
class ObtainAnAccessTokenRequest {
  /**
   * @param {MobileMoneyApiEnvironment} environment -
   * The environment for this request (sandbox or live)
   */
  constructor(environment) {
    const body = {
      grant_type: 'client_credentials',
    };
    this.url = '/v1/oauth/accesstoken';
    this.method = 'post';
    this.data = new FormEncoded().encode(body);
    this.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: environment.authorizationString(),
    };
  }
}

module.exports = {
  ObtainAnAccessTokenRequest,
};
