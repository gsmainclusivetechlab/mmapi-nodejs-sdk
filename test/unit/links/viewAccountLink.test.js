'use strict';

const mmapi = require('../../../lib/index');
const nock = require('nock');

describe('Links', function () {
  let environment = new mmapi.core.SandboxEnvironment('consumerKey', 'consumerSecret', 'apiKey', 'ENHANCED_LEVEL', 'https://e765d0c6-3d88-40d4-9fd8-ef93b154d663.mock.pstmn.io/callback');

  beforeEach(function () {
    clearToken();
    this.http = new mmapi.core.MobileMoneyApiHttpClient(environment);
    this.context = nock(environment.baseUrl);

    switch (environment.securityOption) {
      case 'DEVELOPMENT_LEVEL':
        this.securityOptionUrl = `/simulator/v1.2/passthrough/mm`;
        break;
      case 'STANDARD_LEVEL':
      case 'ENHANCED_LEVEL':
        this.securityOptionUrl = `/2/oauth/simulator/v1.2/mm`;
        break;
      default:
        this.securityOptionUrl = `/simulator/v1.2/passthrough/mm`
        break;
    }

    nock.cleanAll();
  });

  afterEach(() => nock.cleanAll());

  function mockAccessTokenRequest(context, options) {
    options = options || {};

    let accessTokenValue = options.refreshTokenResponse ? 'access-token-from-refresh-token' : 'simple-access-token';
    let times = options.times || 1;

    return context.post('/v1/oauth/accesstoken').times(times).reply(200, function (uri, requestBody) {
      const token = {
        access_token: accessTokenValue,
        expires_in: options.expiresIn || 3600,
        token_type: 'Bearer'
      };

      if (options.refreshTokenValue) {
        token.refresh_token = options.refreshTokenValue;
      }
      return token;
    }, { 'Content-Type': 'application/json' });
  }

  function clearToken() {
    const client = mmapi.core.TokenCache.cacheForEnvironment(environment);
    client.setToken(null);
  }

  function createToken(expired, refresh) {
    const token = new mmapi.core.AccessToken({
      access_token: 'simple-access-token',
      expires_in: expired ? 0 : 3600,
      token_type: 'Bearer',
    });
    token._dateCreated = Date.now() - (expired ? 360000 : 0);
    if (refresh) {
      token.refresh_token = 'refresh-token';
    }
    return token;
  }

  function authHeader(refresh) {
    return {
      reqheaders: {
        authorization: refresh ? 'Bearer access-token-from-refresh-token' : 'Bearer simple-access-token'
      }
    }
  }

  describe('ViewAccountLink', function () {
    const authTokenHeader = authHeader(false);
    const authRefreshHeader = authHeader(true);

    let request;

    beforeEach(async () => {
      request = new mmapi.accountLinking.viewAccountLink({ "msisdn": '+44012345678' }, "REF-1638376731631");
    })

    afterEach(async () => {
    });

    it('should return a link object if request is valid', async function () {
      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .get(`${this.securityOptionUrl}${request.url}`)
        .reply(200, {
          "linkReference": "REF-1638376731631", "sourceAccountIdentifiers": [{ "key": "accountid", "value": "2999" }, { "key": "mandatereference", "value": "REF-1637907197912" }, { "key": "mandatereference", "value": "REF-1637907232832" }, { "key": "mandatereference", "value": "REF-1637907265888" }, { "key": "mandatereference", "value": "REF-1637907412029" }, { "key": "mandatereference", "value": "REF-1637907483978" }, { "key": "mandatereference", "value": "REF-1637909732171" }, { "key": "mandatereference", "value": "REF-1638330257762" }, { "key": "mandatereference", "value": "REF-1638360515423" }], "mode": "both", "status": "active", "requestingOrganisation": { "requestingOrganisationIdentifierType": "organisationid", "requestingOrganisationIdentifier": "12345" }, "creationDate": "2021-12-01T16:38:52", "modificationDate": "2021-12-01T16:38:52", "customData": [{ "key": "keytest", "value": "keyvalue" }]
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('linkReference');
      expect(response.data).toHaveProperty('sourceAccountIdentifiers');
      expect(response.data).toHaveProperty('mode');
      expect(response.data).toHaveProperty('status');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });
  })
});