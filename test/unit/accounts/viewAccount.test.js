'use strict';

const mmapi = require('../../../lib/index');
const nock = require('nock');

describe('Accounts', function () {
  let environment = new mmapi.core.SandboxEnvironment('consumerKey', 'consumerSecret', 'apiKey', 'ENHANCED_LEVEL', 'https://test.com/callback');

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

  describe('ViewAccount', function () {
    const authTokenHeader = authHeader(false);
    const authRefreshHeader = authHeader(true);

    let request;

    beforeEach(async () => {
      request = new mmapi.agentService.viewAccount({ "msisdn": "+44012345678" });
    })

    afterEach(async () => {
    });

    it('should return the account object if request is valid', async function () {
      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .get(`${this.securityOptionUrl}${request.url}`)
        .reply(200, {
          "accountIdentifiers": [{ "key": "msisdn", "value": "+44012345678" }], "identity": [{ "identityId": "318", "identityType": "individual", "identityStatus": "active", "identityKyc": { "nationality": "AD", "dateOfBirth": "2000-11-20", "occupation": "Miner", "employerName": "string", "contactPhone": "+447777777777", "gender": "m", "idDocument": [{ "idType": "passport", "idNumber": "111111", "issueDate": "2018-11-20", "expiryDate": "2018-11-20", "issuer": "ABC", "issuerPlace": "DEF", "issuerCountry": "AD" }], "postalAddress": { "addressLine1": "37", "addressLine2": "ABC Drive", "addressLine3": "string", "city": "Berlin", "stateProvince": "string", "postalCode": "AF1234", "country": "AD" }, "subjectName": { "title": "Mr", "firstName": "H", "middleName": "I", "lastName": "J", "fullName": "H I J", "nativeName": "string" }, "emailAddress": "xyz@xyz.com", "birthCountry": "AD" }, "accountRelationship": "accountholder", "kycVerificationStatus": "verified", "kycVerificationEntity": "ABC Agent", "kycLevel": 1, "customData": [{ "key": "test", "value": "custom" }] }], "accountType": "string", "accountStatus": "available", "accountSubStatus": "subStatus", "fees": [{ "feeType": "string", "feeAmount": "5.46", "feeCurrency": "AED" }], "registeringEntity": "ABC Agent", "creationDate": "2022-01-03T08:10:56", "requestDate": "2021-02-17T15:41:45", "customData": [{ "key": "test", "value": "custom1" }]
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('accountIdentifiers');
      expect(response.data).toHaveProperty('identity');
      expect(response.data).toHaveProperty('accountStatus');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });
  })
});