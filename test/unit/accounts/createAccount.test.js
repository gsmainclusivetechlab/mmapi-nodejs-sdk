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

  describe('CreateAccount', function () {
    const authTokenHeader = authHeader(false);
    const authRefreshHeader = authHeader(true);

    let request;

    beforeEach(async () => {
      request = new mmapi.agentService.createAccount();

      var minm = parseInt('00000000');
      var maxm = parseInt('99999999');
      let msisdn = '+44' + Math.floor(Math.random() * (maxm - minm + 1)) + minm;

      request.body({
        "accountIdentifiers": [
          {
            "key": `msisdn`,
            "value": `${msisdn}`
          }
        ],
        "identity": [
          {
            "identityKyc": {
              "birthCountry": "AD",
              "contactPhone": "+447777777777",
              "dateOfBirth": "2000-11-20",
              "emailAddress": "xyz@xyz.com",
              "employerName": "string",
              "gender": "m",
              "idDocument": [
                {
                  "idType": "passport",
                  "idNumber": "111111",
                  "issueDate": "2018-11-20",
                  "expiryDate": "2018-11-20",
                  "issuer": "ABC",
                  "issuerPlace": "DEF",
                  "issuerCountry": "AD"
                }
              ],
              "nationality": "AD",
              "occupation": "Miner",
              "postalAddress": {
                "addressLine1": "37",
                "addressLine2": "ABC Drive",
                "addressLine3": "string",
                "city": "Berlin",
                "stateProvince": "string",
                "postalCode": "AF1234",
                "country": "AD"
              },
              "subjectName": {
                "title": "Mr",
                "firstName": "H",
                "middleName": "I",
                "lastName": "J",
                "fullName": "H I J",
                "nativeName": "string"
              }
            },
            "accountRelationship": "accountholder",
            "kycVerificationStatus": "verified",
            "kycVerificationEntity": "ABC Agent",
            "kycLevel": 1,
            "customData": [
              {
                "key": "test",
                "value": "custom"
              }
            ]
          }
        ],
        "accountType": "string",
        "customData": [
          {
            "key": "test",
            "value": "custom1"
          }
        ],
        "fees": [
          {
            "feeType": "string",
            "feeAmount": "5.46",
            "feeCurrency": "AED"
          }
        ],
        "registeringEntity": "ABC Agent",
        "requestDate": "2021-02-17T15:41:45.194Z"
      })
    });

    afterEach(async () => {
    });

    it('should return the notification method polling by default', async function () {
      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .post(`${this.securityOptionUrl}${request.url}`, request.data)
        .reply(202, {
          "serverCorrelationId": "c7789514-cce8-49fd-8ce7-a151fd53eeb2", "status": "pending", "notificationMethod": "polling", "objectReference": "205", "pollLimit": 100
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(response.status).toBe(202);
      expect(response.data).toHaveProperty('status');
      expect(response.data.status).toBe('pending');
      expect(response.data).toHaveProperty('serverCorrelationId');
      expect(response.data).toHaveProperty('notificationMethod');
      expect(response.data.notificationMethod).toBe('polling');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });

    it('should return notification method callback if callback is invoked', async function () {
      request.callback('https://test.com/callback');

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .post(`${this.securityOptionUrl}${request.url}`, request.data)
        .reply(202, {
          "serverCorrelationId": "c7789514-cce8-49fd-8ce7-a151fd53eeb2", "status": "pending", "notificationMethod": "callback", "objectReference": "205", "pollLimit": 100
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(response.status).toBe(202);
      expect(response.data).toHaveProperty('status');
      expect(response.data.status).toBe('pending');
      expect(response.data).toHaveProperty('serverCorrelationId');
      expect(response.data).toHaveProperty('notificationMethod');
      expect(response.data.notificationMethod).toBe('callback');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });

    it('should return notification method polling if polling is invoked', async function () {
      request.polling();

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .post(`${this.securityOptionUrl}${request.url}`, request.data)
        .reply(202, {
          "serverCorrelationId": "c7789514-cce8-49fd-8ce7-a151fd53eeb2", "status": "pending", "notificationMethod": "polling", "objectReference": "205", "pollLimit": 100
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(response.status).toBe(202);
      expect(response.data).toHaveProperty('status');
      expect(response.data.status).toBe('pending');
      expect(response.data).toHaveProperty('serverCorrelationId');
      expect(response.data).toHaveProperty('notificationMethod');
      expect(response.data.notificationMethod).toBe('polling');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });

    it('should return request data with property accountIdentifiers if accountIdentifiers is invoked', async function () {
      request.accountIdentifiers([
        {
          "key": `msisdn`,
          "value": `example`
        }
      ]);

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .post(`${this.securityOptionUrl}${request.url}`, request.data)
        .reply(202, {
          "serverCorrelationId": "c7789514-cce8-49fd-8ce7-a151fd53eeb2", "status": "pending", "notificationMethod": "polling", "objectReference": "205", "pollLimit": 100
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(request.data).toHaveProperty('accountIdentifiers');
      expect(response.status).toBe(202);
      expect(response.data).toHaveProperty('status');
      expect(response.data.status).toBe('pending');
      expect(response.data).toHaveProperty('serverCorrelationId');
      expect(response.data).toHaveProperty('notificationMethod');
      expect(response.data.notificationMethod).toBe('polling');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });

    it('should return request data with property identity if identity is invoked', async function () {
      request.identity([
        {
          "identityKyc": {
            "birthCountry": "AD",
            "contactPhone": "+447777777777",
            "dateOfBirth": "2000-11-20",
            "emailAddress": "xyz@xyz.com",
            "employerName": "string",
            "gender": "m",
            "idDocument": [
              {
                "idType": "passport",
                "idNumber": "111111",
                "issueDate": "2018-11-20",
                "expiryDate": "2018-11-20",
                "issuer": "ABC",
                "issuerPlace": "DEF",
                "issuerCountry": "AD"
              }
            ],
            "nationality": "AD",
            "occupation": "Miner",
            "postalAddress": {
              "addressLine1": "37",
              "addressLine2": "ABC Drive",
              "addressLine3": "string",
              "city": "Berlin",
              "stateProvince": "string",
              "postalCode": "AF1234",
              "country": "AD"
            },
            "subjectName": {
              "title": "Mr",
              "firstName": "H",
              "middleName": "I",
              "lastName": "J",
              "fullName": "H I J",
              "nativeName": "string"
            }
          },
          "accountRelationship": "accountholder",
          "kycVerificationStatus": "verified",
          "kycVerificationEntity": "ABC Agent",
          "kycLevel": 1,
          "customData": [
            {
              "key": "test",
              "value": "custom"
            }
          ]
        }
      ]);

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .post(`${this.securityOptionUrl}${request.url}`, request.data)
        .reply(202, {
          "serverCorrelationId": "c7789514-cce8-49fd-8ce7-a151fd53eeb2", "status": "pending", "notificationMethod": "polling", "objectReference": "205", "pollLimit": 100
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(request.data).toHaveProperty('identity');
      expect(response.status).toBe(202);
      expect(response.data).toHaveProperty('status');
      expect(response.data.status).toBe('pending');
      expect(response.data).toHaveProperty('serverCorrelationId');
      expect(response.data).toHaveProperty('notificationMethod');
      expect(response.data.notificationMethod).toBe('polling');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });

    it('should return request data with property accountType if identity is invoked', async function () {
      request.accountType('string');

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .post(`${this.securityOptionUrl}${request.url}`, request.data)
        .reply(202, {
          "serverCorrelationId": "c7789514-cce8-49fd-8ce7-a151fd53eeb2", "status": "pending", "notificationMethod": "polling", "objectReference": "205", "pollLimit": 100
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(request.data).toHaveProperty('accountType');
      expect(response.status).toBe(202);
      expect(response.data).toHaveProperty('status');
      expect(response.data.status).toBe('pending');
      expect(response.data).toHaveProperty('serverCorrelationId');
      expect(response.data).toHaveProperty('notificationMethod');
      expect(response.data.notificationMethod).toBe('polling');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });

    it('should return request data with property customData if identity is invoked', async function () {
      request.customData([
        {
          "key": "test",
          "value": "custom1"
        }
      ]);

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .post(`${this.securityOptionUrl}${request.url}`, request.data)
        .reply(202, {
          "serverCorrelationId": "c7789514-cce8-49fd-8ce7-a151fd53eeb2", "status": "pending", "notificationMethod": "polling", "objectReference": "205", "pollLimit": 100
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(request.data).toHaveProperty('customData');
      expect(response.status).toBe(202);
      expect(response.data).toHaveProperty('status');
      expect(response.data.status).toBe('pending');
      expect(response.data).toHaveProperty('serverCorrelationId');
      expect(response.data).toHaveProperty('notificationMethod');
      expect(response.data.notificationMethod).toBe('polling');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });

    it('should return request data with property fees if identity is invoked', async function () {
      request.fees([
        {
          "feeType": "string",
          "feeAmount": "5.46",
          "feeCurrency": "AED"
        }
      ]);

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .post(`${this.securityOptionUrl}${request.url}`, request.data)
        .reply(202, {
          "serverCorrelationId": "c7789514-cce8-49fd-8ce7-a151fd53eeb2", "status": "pending", "notificationMethod": "polling", "objectReference": "205", "pollLimit": 100
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(request.data).toHaveProperty('fees');
      expect(response.status).toBe(202);
      expect(response.data).toHaveProperty('status');
      expect(response.data.status).toBe('pending');
      expect(response.data).toHaveProperty('serverCorrelationId');
      expect(response.data).toHaveProperty('notificationMethod');
      expect(response.data.notificationMethod).toBe('polling');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });

    it('should return request data with property registeringEntity if identity is invoked', async function () {
      request.registeringEntity("ABC Agent");

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .post(`${this.securityOptionUrl}${request.url}`, request.data)
        .reply(202, {
          "serverCorrelationId": "c7789514-cce8-49fd-8ce7-a151fd53eeb2", "status": "pending", "notificationMethod": "polling", "objectReference": "205", "pollLimit": 100
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(request.data).toHaveProperty('registeringEntity');
      expect(response.status).toBe(202);
      expect(response.data).toHaveProperty('status');
      expect(response.data.status).toBe('pending');
      expect(response.data).toHaveProperty('serverCorrelationId');
      expect(response.data).toHaveProperty('notificationMethod');
      expect(response.data.notificationMethod).toBe('polling');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });

    it('should return request data with property requestDate if identity is invoked', async function () {
      request.requestDate("2021-02-17T15:41:45.194Z");

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .post(`${this.securityOptionUrl}${request.url}`, request.data)
        .reply(202, {
          "serverCorrelationId": "c7789514-cce8-49fd-8ce7-a151fd53eeb2", "status": "pending", "notificationMethod": "polling", "objectReference": "205", "pollLimit": 100
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(request.data).toHaveProperty('requestDate');
      expect(response.status).toBe(202);
      expect(response.data).toHaveProperty('status');
      expect(response.data.status).toBe('pending');
      expect(response.data).toHaveProperty('serverCorrelationId');
      expect(response.data).toHaveProperty('notificationMethod');
      expect(response.data.notificationMethod).toBe('polling');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });
  })
});