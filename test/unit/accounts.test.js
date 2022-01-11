'use strict';

const mmapi = require('../../lib/index');
const nock = require('nock');

describe('Accounts', function () {
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

  describe('UpdateAccountIdentity', function () {
    const authTokenHeader = authHeader(false);
    const authRefreshHeader = authHeader(true);

    let request;

    beforeEach(async () => {
      request = new mmapi.agentService.updateAccountIdentity({ "accountid": "2000" }, "105");

      request.body([
        {
          "op": "replace",
          "path": "/kycVerificationStatus",
          "value": "verified"
        }
      ]);
    })

    afterEach(async () => {
    });

    it('should return the notification method polling by default', async function () {
      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .patch(`${this.securityOptionUrl}${request.url}`, request.data)
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
        .patch(`${this.securityOptionUrl}${request.url}`, request.data)
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
        .patch(`${this.securityOptionUrl}${request.url}`, request.data)
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

    it('should return request data with property op if op is invoked', async function () {
      request.op("replace");

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .patch(`${this.securityOptionUrl}${request.url}`, request.data)
        .reply(202, {
          "serverCorrelationId": "c7789514-cce8-49fd-8ce7-a151fd53eeb2", "status": "pending", "notificationMethod": "polling", "objectReference": "205", "pollLimit": 100
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(request.data[0]).toHaveProperty('op');
      expect(response.status).toBe(202);
      expect(response.data).toHaveProperty('status');
      expect(response.data.status).toBe('pending');
      expect(response.data).toHaveProperty('serverCorrelationId');
      expect(response.data).toHaveProperty('notificationMethod');
      expect(response.data.notificationMethod).toBe('polling');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });

    it('should return request data with property path if path is invoked', async function () {
      request.path("/kycVerificationStatus");

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .patch(`${this.securityOptionUrl}${request.url}`, request.data)
        .reply(202, {
          "serverCorrelationId": "c7789514-cce8-49fd-8ce7-a151fd53eeb2", "status": "pending", "notificationMethod": "polling", "objectReference": "205", "pollLimit": 100
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(request.data[0]).toHaveProperty('path');
      expect(response.status).toBe(202);
      expect(response.data).toHaveProperty('status');
      expect(response.data.status).toBe('pending');
      expect(response.data).toHaveProperty('serverCorrelationId');
      expect(response.data).toHaveProperty('notificationMethod');
      expect(response.data.notificationMethod).toBe('polling');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });

    it('should return request data with property value if value is invoked', async function () {
      request.value("verified");

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .patch(`${this.securityOptionUrl}${request.url}`, request.data)
        .reply(202, {
          "serverCorrelationId": "c7789514-cce8-49fd-8ce7-a151fd53eeb2", "status": "pending", "notificationMethod": "polling", "objectReference": "205", "pollLimit": 100
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(request.data[0]).toHaveProperty('value');
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

  describe('ViewAccountBalance', function () {
    const authTokenHeader = authHeader(false);
    const authRefreshHeader = authHeader(true);

    let request;

    beforeEach(async () => {
      request = new mmapi.agentService.viewAccountBalance({ "msisdn": "+44012345678" });
    })

    afterEach(async () => {
    });

    it('should return the balance object for request with accountIdentifiers', async function () {
      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .get(`${this.securityOptionUrl}${request.url}`)
        .reply(200, {
          "currentBalance": "0.00", "availableBalance": "0.00", "reservedBalance": "0.00", "unclearedBalance": "0.00", "accountStatus": "available"
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(response.status).toBe(200);
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });

    it('should return the balance object for request with no accountIdentifiers', async function () {
      request = new mmapi.agentService.viewAccountBalance();

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .get(`${this.securityOptionUrl}${request.url}`)
        .reply(200, {
          "currentBalance": "0.00", "availableBalance": "0.00", "reservedBalance": "0.00", "unclearedBalance": "0.00", "accountStatus": "available"
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(response.status).toBe(200);
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });
  })

  describe('ViewAccountName', function () {
    const authTokenHeader = authHeader(false);
    const authRefreshHeader = authHeader(true);

    let request;

    beforeEach(async () => {
      request = new mmapi.agentService.viewAccountName({ "msisdn": "+44012345678" });
    })

    afterEach(async () => {
    });

    it('should return the account holder name object if request is valid', async function () {
      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .get(`${this.securityOptionUrl}${request.url}`)
        .reply(200, {
          "name": { "title": "Mr", "firstName": "Jeff", "middleName": "James", "lastName": "Jimmer", "fullName": "Jeff Jimmer" }, "lei": "AAAA0012345678901299"
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(response.status).toBe(200);
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });
  })

  describe('ViewAccountTransactions', function () {
    const authTokenHeader = authHeader(false);
    const authRefreshHeader = authHeader(true);

    let request;

    beforeEach(async () => {
      request = new mmapi.agentService.viewAccountTransactions({ "walletid": "1" });
    })

    afterEach(async () => {
    });

    it('should return a transactions array of length 2 and indicate via response header how many transactions available in total', async function () {
      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .get(`${this.securityOptionUrl}${request.url}`)
        .reply(200, [
          { "transactionReference": "REF-1620028406917", "creditParty": [{ "key": "accountid", "value": "2000" }, { "key": "linkref", "value": "REF-1621839627337" }, { "key": "linkref", "value": "REF-1635445811066" }], "debitParty": [{ "key": "accountid", "value": "2999" }], "type": "inttransfer", "transactionStatus": "completed", "amount": "100.00", "currency": "GBP", "internationalTransferInformation": { "originCountry": "GB", "quotationReference": "{{quotationReference}}", "quoteId": "{{quoteId}}", "deliveryMethod": "agent", "receivingCountry": "RW", "relationshipSender": "none", "remittancePurpose": "personal", "sendingServiceProviderCountry": "AD" }, "senderKyc": { "nationality": "GB", "dateOfBirth": "1970-07-03", "occupation": "Manager", "employerName": "MFX", "contactPhone": "+447125588999", "gender": "m", "idDocument": [{ "idType": "nationalidcard", "idNumber": "1234567", "issueDate": "2018-07-03", "expiryDate": "2021-07-03", "issuer": "UKPA", "issuerPlace": "GB", "issuerCountry": "GB" }], "postalAddress": { "addressLine1": "111 ABC Street", "city": "New York", "stateProvince": "New York", "postalCode": "ABCD", "country": "GB" }, "subjectName": { "title": "Mr", "firstName": "Luke", "middleName": "R", "lastName": "Skywalker", "fullName": "Luke R Skywalker", "nativeName": "ABC" }, "emailAddress": "luke.skywalkeraaabbb@gmail.com", "birthCountry": "GB" }, "requestingOrganisation": { "requestingOrganisationIdentifierType": "organisationid", "requestingOrganisationIdentifier": "testorganisation" }, "creationDate": "2021-05-03T08:53:27", "modificationDate": "2021-05-03T08:53:27", "requestDate": "2021-05-03T08:53:27" }, { "transactionReference": "REF-1620133857481", "creditParty": [{ "key": "accountid", "value": "2000" }, { "key": "linkref", "value": "REF-1621839627337" }, { "key": "linkref", "value": "REF-1635445811066" }], "debitParty": [{ "key": "accountid", "value": "2999" }], "type": "inttransfer", "transactionStatus": "pending", "amount": "100.00", "currency": "GBP", "internationalTransferInformation": { "originCountry": "GB", "quotationReference": "{{quotationReference}}", "quoteId": "{{quoteId}}", "deliveryMethod": "agent", "receivingCountry": "RW", "relationshipSender": "none", "remittancePurpose": "personal", "sendingServiceProviderCountry": "AD" }, "senderKyc": { "nationality": "GB", "dateOfBirth": "1970-07-03", "occupation": "Manager", "employerName": "MFX", "contactPhone": "+447125588999", "gender": "m", "idDocument": [{ "idType": "nationalidcard", "idNumber": "1234567", "issueDate": "2018-07-03", "expiryDate": "2021-07-03", "issuer": "UKPA", "issuerPlace": "GB", "issuerCountry": "GB" }], "postalAddress": { "addressLine1": "111 ABC Street", "city": "New York", "stateProvince": "New York", "postalCode": "ABCD", "country": "GB" }, "subjectName": { "title": "Mr", "firstName": "Luke", "middleName": "R", "lastName": "Skywalker", "fullName": "Luke R Skywalker", "nativeName": "ABC" }, "emailAddress": "luke.skywalkeraaabbb@gmail.com", "birthCountry": "GB" }, "requestingOrganisation": { "requestingOrganisationIdentifierType": "organisationid", "requestingOrganisationIdentifier": "testorganisation" }, "creationDate": "2021-05-04T14:10:57", "modificationDate": "2021-05-04T14:10:57", "requestDate": "2021-05-04T14:10:57" }
        ], {
          "Content-Type": "application/json",
          'x-records-available-count': 2,
          'x-records-returned-count': 2,
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(response.status).toBe(200);
      expect(response.data.length).toBe(2);
      expect(response.headers).toHaveProperty('x-records-available-count');
      expect(response.headers).toHaveProperty('x-records-returned-count');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });

    it('should return request params with property offset if offset is invoked', async function () {
      request.offset(0);

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .get(`${this.securityOptionUrl}${request.url}`)
        .query({ offset: "0" })
        .reply(200, [
          { "transactionReference": "REF-1620028406917", "creditParty": [{ "key": "accountid", "value": "2000" }, { "key": "linkref", "value": "REF-1621839627337" }, { "key": "linkref", "value": "REF-1635445811066" }], "debitParty": [{ "key": "accountid", "value": "2999" }], "type": "inttransfer", "transactionStatus": "completed", "amount": "100.00", "currency": "GBP", "internationalTransferInformation": { "originCountry": "GB", "quotationReference": "{{quotationReference}}", "quoteId": "{{quoteId}}", "deliveryMethod": "agent", "receivingCountry": "RW", "relationshipSender": "none", "remittancePurpose": "personal", "sendingServiceProviderCountry": "AD" }, "senderKyc": { "nationality": "GB", "dateOfBirth": "1970-07-03", "occupation": "Manager", "employerName": "MFX", "contactPhone": "+447125588999", "gender": "m", "idDocument": [{ "idType": "nationalidcard", "idNumber": "1234567", "issueDate": "2018-07-03", "expiryDate": "2021-07-03", "issuer": "UKPA", "issuerPlace": "GB", "issuerCountry": "GB" }], "postalAddress": { "addressLine1": "111 ABC Street", "city": "New York", "stateProvince": "New York", "postalCode": "ABCD", "country": "GB" }, "subjectName": { "title": "Mr", "firstName": "Luke", "middleName": "R", "lastName": "Skywalker", "fullName": "Luke R Skywalker", "nativeName": "ABC" }, "emailAddress": "luke.skywalkeraaabbb@gmail.com", "birthCountry": "GB" }, "requestingOrganisation": { "requestingOrganisationIdentifierType": "organisationid", "requestingOrganisationIdentifier": "testorganisation" }, "creationDate": "2021-05-03T08:53:27", "modificationDate": "2021-05-03T08:53:27", "requestDate": "2021-05-03T08:53:27" }, { "transactionReference": "REF-1620133857481", "creditParty": [{ "key": "accountid", "value": "2000" }, { "key": "linkref", "value": "REF-1621839627337" }, { "key": "linkref", "value": "REF-1635445811066" }], "debitParty": [{ "key": "accountid", "value": "2999" }], "type": "inttransfer", "transactionStatus": "pending", "amount": "100.00", "currency": "GBP", "internationalTransferInformation": { "originCountry": "GB", "quotationReference": "{{quotationReference}}", "quoteId": "{{quoteId}}", "deliveryMethod": "agent", "receivingCountry": "RW", "relationshipSender": "none", "remittancePurpose": "personal", "sendingServiceProviderCountry": "AD" }, "senderKyc": { "nationality": "GB", "dateOfBirth": "1970-07-03", "occupation": "Manager", "employerName": "MFX", "contactPhone": "+447125588999", "gender": "m", "idDocument": [{ "idType": "nationalidcard", "idNumber": "1234567", "issueDate": "2018-07-03", "expiryDate": "2021-07-03", "issuer": "UKPA", "issuerPlace": "GB", "issuerCountry": "GB" }], "postalAddress": { "addressLine1": "111 ABC Street", "city": "New York", "stateProvince": "New York", "postalCode": "ABCD", "country": "GB" }, "subjectName": { "title": "Mr", "firstName": "Luke", "middleName": "R", "lastName": "Skywalker", "fullName": "Luke R Skywalker", "nativeName": "ABC" }, "emailAddress": "luke.skywalkeraaabbb@gmail.com", "birthCountry": "GB" }, "requestingOrganisation": { "requestingOrganisationIdentifierType": "organisationid", "requestingOrganisationIdentifier": "testorganisation" }, "creationDate": "2021-05-04T14:10:57", "modificationDate": "2021-05-04T14:10:57", "requestDate": "2021-05-04T14:10:57" }
        ], {
          "Content-Type": "application/json",
          'x-records-available-count': 2,
          'x-records-returned-count': 2,
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(request.params).toHaveProperty('offset');
      expect(response.data.length).toBe(2);
      expect(response.headers).toHaveProperty('x-records-available-count');
      expect(response.headers).toHaveProperty('x-records-returned-count');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });

    it('should return request params with property limit if limit is invoked', async function () {
      request.limit(2);

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .get(`${this.securityOptionUrl}${request.url}`)
        .query({ limit: "2" })
        .reply(200, [
          { "transactionReference": "REF-1620028406917", "creditParty": [{ "key": "accountid", "value": "2000" }, { "key": "linkref", "value": "REF-1621839627337" }, { "key": "linkref", "value": "REF-1635445811066" }], "debitParty": [{ "key": "accountid", "value": "2999" }], "type": "inttransfer", "transactionStatus": "completed", "amount": "100.00", "currency": "GBP", "internationalTransferInformation": { "originCountry": "GB", "quotationReference": "{{quotationReference}}", "quoteId": "{{quoteId}}", "deliveryMethod": "agent", "receivingCountry": "RW", "relationshipSender": "none", "remittancePurpose": "personal", "sendingServiceProviderCountry": "AD" }, "senderKyc": { "nationality": "GB", "dateOfBirth": "1970-07-03", "occupation": "Manager", "employerName": "MFX", "contactPhone": "+447125588999", "gender": "m", "idDocument": [{ "idType": "nationalidcard", "idNumber": "1234567", "issueDate": "2018-07-03", "expiryDate": "2021-07-03", "issuer": "UKPA", "issuerPlace": "GB", "issuerCountry": "GB" }], "postalAddress": { "addressLine1": "111 ABC Street", "city": "New York", "stateProvince": "New York", "postalCode": "ABCD", "country": "GB" }, "subjectName": { "title": "Mr", "firstName": "Luke", "middleName": "R", "lastName": "Skywalker", "fullName": "Luke R Skywalker", "nativeName": "ABC" }, "emailAddress": "luke.skywalkeraaabbb@gmail.com", "birthCountry": "GB" }, "requestingOrganisation": { "requestingOrganisationIdentifierType": "organisationid", "requestingOrganisationIdentifier": "testorganisation" }, "creationDate": "2021-05-03T08:53:27", "modificationDate": "2021-05-03T08:53:27", "requestDate": "2021-05-03T08:53:27" }, { "transactionReference": "REF-1620133857481", "creditParty": [{ "key": "accountid", "value": "2000" }, { "key": "linkref", "value": "REF-1621839627337" }, { "key": "linkref", "value": "REF-1635445811066" }], "debitParty": [{ "key": "accountid", "value": "2999" }], "type": "inttransfer", "transactionStatus": "pending", "amount": "100.00", "currency": "GBP", "internationalTransferInformation": { "originCountry": "GB", "quotationReference": "{{quotationReference}}", "quoteId": "{{quoteId}}", "deliveryMethod": "agent", "receivingCountry": "RW", "relationshipSender": "none", "remittancePurpose": "personal", "sendingServiceProviderCountry": "AD" }, "senderKyc": { "nationality": "GB", "dateOfBirth": "1970-07-03", "occupation": "Manager", "employerName": "MFX", "contactPhone": "+447125588999", "gender": "m", "idDocument": [{ "idType": "nationalidcard", "idNumber": "1234567", "issueDate": "2018-07-03", "expiryDate": "2021-07-03", "issuer": "UKPA", "issuerPlace": "GB", "issuerCountry": "GB" }], "postalAddress": { "addressLine1": "111 ABC Street", "city": "New York", "stateProvince": "New York", "postalCode": "ABCD", "country": "GB" }, "subjectName": { "title": "Mr", "firstName": "Luke", "middleName": "R", "lastName": "Skywalker", "fullName": "Luke R Skywalker", "nativeName": "ABC" }, "emailAddress": "luke.skywalkeraaabbb@gmail.com", "birthCountry": "GB" }, "requestingOrganisation": { "requestingOrganisationIdentifierType": "organisationid", "requestingOrganisationIdentifier": "testorganisation" }, "creationDate": "2021-05-04T14:10:57", "modificationDate": "2021-05-04T14:10:57", "requestDate": "2021-05-04T14:10:57" }
        ], {
          "Content-Type": "application/json",
          'x-records-available-count': 2,
          'x-records-returned-count': 2,
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(request.params).toHaveProperty('limit');
      expect(response.data.length).toBe(2);
      expect(response.headers).toHaveProperty('x-records-available-count');
      expect(response.headers).toHaveProperty('x-records-returned-count');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });

    it('should return request params with property fromDateTime if fromDateTime is invoked', async function () {
      request.fromDateTime("2022-01-01T00:00:00");

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .get(`${this.securityOptionUrl}${request.url}`)
        .query({ fromDateTime: "2022-01-01T00:00:00" })
        .reply(200, [
          { "transactionReference": "REF-1620028406917", "creditParty": [{ "key": "accountid", "value": "2000" }, { "key": "linkref", "value": "REF-1621839627337" }, { "key": "linkref", "value": "REF-1635445811066" }], "debitParty": [{ "key": "accountid", "value": "2999" }], "type": "inttransfer", "transactionStatus": "completed", "amount": "100.00", "currency": "GBP", "internationalTransferInformation": { "originCountry": "GB", "quotationReference": "{{quotationReference}}", "quoteId": "{{quoteId}}", "deliveryMethod": "agent", "receivingCountry": "RW", "relationshipSender": "none", "remittancePurpose": "personal", "sendingServiceProviderCountry": "AD" }, "senderKyc": { "nationality": "GB", "dateOfBirth": "1970-07-03", "occupation": "Manager", "employerName": "MFX", "contactPhone": "+447125588999", "gender": "m", "idDocument": [{ "idType": "nationalidcard", "idNumber": "1234567", "issueDate": "2018-07-03", "expiryDate": "2021-07-03", "issuer": "UKPA", "issuerPlace": "GB", "issuerCountry": "GB" }], "postalAddress": { "addressLine1": "111 ABC Street", "city": "New York", "stateProvince": "New York", "postalCode": "ABCD", "country": "GB" }, "subjectName": { "title": "Mr", "firstName": "Luke", "middleName": "R", "lastName": "Skywalker", "fullName": "Luke R Skywalker", "nativeName": "ABC" }, "emailAddress": "luke.skywalkeraaabbb@gmail.com", "birthCountry": "GB" }, "requestingOrganisation": { "requestingOrganisationIdentifierType": "organisationid", "requestingOrganisationIdentifier": "testorganisation" }, "creationDate": "2021-05-03T08:53:27", "modificationDate": "2021-05-03T08:53:27", "requestDate": "2021-05-03T08:53:27" }, { "transactionReference": "REF-1620133857481", "creditParty": [{ "key": "accountid", "value": "2000" }, { "key": "linkref", "value": "REF-1621839627337" }, { "key": "linkref", "value": "REF-1635445811066" }], "debitParty": [{ "key": "accountid", "value": "2999" }], "type": "inttransfer", "transactionStatus": "pending", "amount": "100.00", "currency": "GBP", "internationalTransferInformation": { "originCountry": "GB", "quotationReference": "{{quotationReference}}", "quoteId": "{{quoteId}}", "deliveryMethod": "agent", "receivingCountry": "RW", "relationshipSender": "none", "remittancePurpose": "personal", "sendingServiceProviderCountry": "AD" }, "senderKyc": { "nationality": "GB", "dateOfBirth": "1970-07-03", "occupation": "Manager", "employerName": "MFX", "contactPhone": "+447125588999", "gender": "m", "idDocument": [{ "idType": "nationalidcard", "idNumber": "1234567", "issueDate": "2018-07-03", "expiryDate": "2021-07-03", "issuer": "UKPA", "issuerPlace": "GB", "issuerCountry": "GB" }], "postalAddress": { "addressLine1": "111 ABC Street", "city": "New York", "stateProvince": "New York", "postalCode": "ABCD", "country": "GB" }, "subjectName": { "title": "Mr", "firstName": "Luke", "middleName": "R", "lastName": "Skywalker", "fullName": "Luke R Skywalker", "nativeName": "ABC" }, "emailAddress": "luke.skywalkeraaabbb@gmail.com", "birthCountry": "GB" }, "requestingOrganisation": { "requestingOrganisationIdentifierType": "organisationid", "requestingOrganisationIdentifier": "testorganisation" }, "creationDate": "2021-05-04T14:10:57", "modificationDate": "2021-05-04T14:10:57", "requestDate": "2021-05-04T14:10:57" }
        ], {
          "Content-Type": "application/json",
          'x-records-available-count': 2,
          'x-records-returned-count': 2,
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(request.params).toHaveProperty('fromDateTime');
      expect(response.data.length).toBe(2);
      expect(response.headers).toHaveProperty('x-records-available-count');
      expect(response.headers).toHaveProperty('x-records-returned-count');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });

    it('should return request params with property toDateTime if toDateTime is invoked', async function () {
      request.toDateTime("2022-01-01T00:00:00");

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .get(`${this.securityOptionUrl}${request.url}`)
        .query({ toDateTime: "2022-01-01T00:00:00" })
        .reply(200, [
          { "transactionReference": "REF-1620028406917", "creditParty": [{ "key": "accountid", "value": "2000" }, { "key": "linkref", "value": "REF-1621839627337" }, { "key": "linkref", "value": "REF-1635445811066" }], "debitParty": [{ "key": "accountid", "value": "2999" }], "type": "inttransfer", "transactionStatus": "completed", "amount": "100.00", "currency": "GBP", "internationalTransferInformation": { "originCountry": "GB", "quotationReference": "{{quotationReference}}", "quoteId": "{{quoteId}}", "deliveryMethod": "agent", "receivingCountry": "RW", "relationshipSender": "none", "remittancePurpose": "personal", "sendingServiceProviderCountry": "AD" }, "senderKyc": { "nationality": "GB", "dateOfBirth": "1970-07-03", "occupation": "Manager", "employerName": "MFX", "contactPhone": "+447125588999", "gender": "m", "idDocument": [{ "idType": "nationalidcard", "idNumber": "1234567", "issueDate": "2018-07-03", "expiryDate": "2021-07-03", "issuer": "UKPA", "issuerPlace": "GB", "issuerCountry": "GB" }], "postalAddress": { "addressLine1": "111 ABC Street", "city": "New York", "stateProvince": "New York", "postalCode": "ABCD", "country": "GB" }, "subjectName": { "title": "Mr", "firstName": "Luke", "middleName": "R", "lastName": "Skywalker", "fullName": "Luke R Skywalker", "nativeName": "ABC" }, "emailAddress": "luke.skywalkeraaabbb@gmail.com", "birthCountry": "GB" }, "requestingOrganisation": { "requestingOrganisationIdentifierType": "organisationid", "requestingOrganisationIdentifier": "testorganisation" }, "creationDate": "2021-05-03T08:53:27", "modificationDate": "2021-05-03T08:53:27", "requestDate": "2021-05-03T08:53:27" }, { "transactionReference": "REF-1620133857481", "creditParty": [{ "key": "accountid", "value": "2000" }, { "key": "linkref", "value": "REF-1621839627337" }, { "key": "linkref", "value": "REF-1635445811066" }], "debitParty": [{ "key": "accountid", "value": "2999" }], "type": "inttransfer", "transactionStatus": "pending", "amount": "100.00", "currency": "GBP", "internationalTransferInformation": { "originCountry": "GB", "quotationReference": "{{quotationReference}}", "quoteId": "{{quoteId}}", "deliveryMethod": "agent", "receivingCountry": "RW", "relationshipSender": "none", "remittancePurpose": "personal", "sendingServiceProviderCountry": "AD" }, "senderKyc": { "nationality": "GB", "dateOfBirth": "1970-07-03", "occupation": "Manager", "employerName": "MFX", "contactPhone": "+447125588999", "gender": "m", "idDocument": [{ "idType": "nationalidcard", "idNumber": "1234567", "issueDate": "2018-07-03", "expiryDate": "2021-07-03", "issuer": "UKPA", "issuerPlace": "GB", "issuerCountry": "GB" }], "postalAddress": { "addressLine1": "111 ABC Street", "city": "New York", "stateProvince": "New York", "postalCode": "ABCD", "country": "GB" }, "subjectName": { "title": "Mr", "firstName": "Luke", "middleName": "R", "lastName": "Skywalker", "fullName": "Luke R Skywalker", "nativeName": "ABC" }, "emailAddress": "luke.skywalkeraaabbb@gmail.com", "birthCountry": "GB" }, "requestingOrganisation": { "requestingOrganisationIdentifierType": "organisationid", "requestingOrganisationIdentifier": "testorganisation" }, "creationDate": "2021-05-04T14:10:57", "modificationDate": "2021-05-04T14:10:57", "requestDate": "2021-05-04T14:10:57" }
        ], {
          "Content-Type": "application/json",
          'x-records-available-count': 2,
          'x-records-returned-count': 2,
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(request.params).toHaveProperty('toDateTime');
      expect(response.data.length).toBe(2);
      expect(response.headers).toHaveProperty('x-records-available-count');
      expect(response.headers).toHaveProperty('x-records-returned-count');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });

    it('should return request params with property transactionStatus if transactionStatus is invoked', async function () {
      request.transactionStatus("completed");

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .get(`${this.securityOptionUrl}${request.url}`)
        .query({ transactionStatus: "completed" })
        .reply(200, [
          { "transactionReference": "REF-1620028406917", "creditParty": [{ "key": "accountid", "value": "2000" }, { "key": "linkref", "value": "REF-1621839627337" }, { "key": "linkref", "value": "REF-1635445811066" }], "debitParty": [{ "key": "accountid", "value": "2999" }], "type": "inttransfer", "transactionStatus": "completed", "amount": "100.00", "currency": "GBP", "internationalTransferInformation": { "originCountry": "GB", "quotationReference": "{{quotationReference}}", "quoteId": "{{quoteId}}", "deliveryMethod": "agent", "receivingCountry": "RW", "relationshipSender": "none", "remittancePurpose": "personal", "sendingServiceProviderCountry": "AD" }, "senderKyc": { "nationality": "GB", "dateOfBirth": "1970-07-03", "occupation": "Manager", "employerName": "MFX", "contactPhone": "+447125588999", "gender": "m", "idDocument": [{ "idType": "nationalidcard", "idNumber": "1234567", "issueDate": "2018-07-03", "expiryDate": "2021-07-03", "issuer": "UKPA", "issuerPlace": "GB", "issuerCountry": "GB" }], "postalAddress": { "addressLine1": "111 ABC Street", "city": "New York", "stateProvince": "New York", "postalCode": "ABCD", "country": "GB" }, "subjectName": { "title": "Mr", "firstName": "Luke", "middleName": "R", "lastName": "Skywalker", "fullName": "Luke R Skywalker", "nativeName": "ABC" }, "emailAddress": "luke.skywalkeraaabbb@gmail.com", "birthCountry": "GB" }, "requestingOrganisation": { "requestingOrganisationIdentifierType": "organisationid", "requestingOrganisationIdentifier": "testorganisation" }, "creationDate": "2021-05-03T08:53:27", "modificationDate": "2021-05-03T08:53:27", "requestDate": "2021-05-03T08:53:27" }, { "transactionReference": "REF-1620133857481", "creditParty": [{ "key": "accountid", "value": "2000" }, { "key": "linkref", "value": "REF-1621839627337" }, { "key": "linkref", "value": "REF-1635445811066" }], "debitParty": [{ "key": "accountid", "value": "2999" }], "type": "inttransfer", "transactionStatus": "pending", "amount": "100.00", "currency": "GBP", "internationalTransferInformation": { "originCountry": "GB", "quotationReference": "{{quotationReference}}", "quoteId": "{{quoteId}}", "deliveryMethod": "agent", "receivingCountry": "RW", "relationshipSender": "none", "remittancePurpose": "personal", "sendingServiceProviderCountry": "AD" }, "senderKyc": { "nationality": "GB", "dateOfBirth": "1970-07-03", "occupation": "Manager", "employerName": "MFX", "contactPhone": "+447125588999", "gender": "m", "idDocument": [{ "idType": "nationalidcard", "idNumber": "1234567", "issueDate": "2018-07-03", "expiryDate": "2021-07-03", "issuer": "UKPA", "issuerPlace": "GB", "issuerCountry": "GB" }], "postalAddress": { "addressLine1": "111 ABC Street", "city": "New York", "stateProvince": "New York", "postalCode": "ABCD", "country": "GB" }, "subjectName": { "title": "Mr", "firstName": "Luke", "middleName": "R", "lastName": "Skywalker", "fullName": "Luke R Skywalker", "nativeName": "ABC" }, "emailAddress": "luke.skywalkeraaabbb@gmail.com", "birthCountry": "GB" }, "requestingOrganisation": { "requestingOrganisationIdentifierType": "organisationid", "requestingOrganisationIdentifier": "testorganisation" }, "creationDate": "2021-05-04T14:10:57", "modificationDate": "2021-05-04T14:10:57", "requestDate": "2021-05-04T14:10:57" }
        ], {
          "Content-Type": "application/json",
          'x-records-available-count': 2,
          'x-records-returned-count': 2,
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(request.params).toHaveProperty('transactionStatus');
      expect(response.data.length).toBe(2);
      expect(response.headers).toHaveProperty('x-records-available-count');
      expect(response.headers).toHaveProperty('x-records-returned-count');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });

    it('should return request params with property transactionType if transactionType is invoked', async function () {
      request.transactionType("deposit");

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .get(`${this.securityOptionUrl}${request.url}`)
        .query({ transactionType: "deposit" })
        .reply(200, [
          { "transactionReference": "REF-1620028406917", "creditParty": [{ "key": "accountid", "value": "2000" }, { "key": "linkref", "value": "REF-1621839627337" }, { "key": "linkref", "value": "REF-1635445811066" }], "debitParty": [{ "key": "accountid", "value": "2999" }], "type": "inttransfer", "transactionStatus": "completed", "amount": "100.00", "currency": "GBP", "internationalTransferInformation": { "originCountry": "GB", "quotationReference": "{{quotationReference}}", "quoteId": "{{quoteId}}", "deliveryMethod": "agent", "receivingCountry": "RW", "relationshipSender": "none", "remittancePurpose": "personal", "sendingServiceProviderCountry": "AD" }, "senderKyc": { "nationality": "GB", "dateOfBirth": "1970-07-03", "occupation": "Manager", "employerName": "MFX", "contactPhone": "+447125588999", "gender": "m", "idDocument": [{ "idType": "nationalidcard", "idNumber": "1234567", "issueDate": "2018-07-03", "expiryDate": "2021-07-03", "issuer": "UKPA", "issuerPlace": "GB", "issuerCountry": "GB" }], "postalAddress": { "addressLine1": "111 ABC Street", "city": "New York", "stateProvince": "New York", "postalCode": "ABCD", "country": "GB" }, "subjectName": { "title": "Mr", "firstName": "Luke", "middleName": "R", "lastName": "Skywalker", "fullName": "Luke R Skywalker", "nativeName": "ABC" }, "emailAddress": "luke.skywalkeraaabbb@gmail.com", "birthCountry": "GB" }, "requestingOrganisation": { "requestingOrganisationIdentifierType": "organisationid", "requestingOrganisationIdentifier": "testorganisation" }, "creationDate": "2021-05-03T08:53:27", "modificationDate": "2021-05-03T08:53:27", "requestDate": "2021-05-03T08:53:27" }, { "transactionReference": "REF-1620133857481", "creditParty": [{ "key": "accountid", "value": "2000" }, { "key": "linkref", "value": "REF-1621839627337" }, { "key": "linkref", "value": "REF-1635445811066" }], "debitParty": [{ "key": "accountid", "value": "2999" }], "type": "inttransfer", "transactionStatus": "pending", "amount": "100.00", "currency": "GBP", "internationalTransferInformation": { "originCountry": "GB", "quotationReference": "{{quotationReference}}", "quoteId": "{{quoteId}}", "deliveryMethod": "agent", "receivingCountry": "RW", "relationshipSender": "none", "remittancePurpose": "personal", "sendingServiceProviderCountry": "AD" }, "senderKyc": { "nationality": "GB", "dateOfBirth": "1970-07-03", "occupation": "Manager", "employerName": "MFX", "contactPhone": "+447125588999", "gender": "m", "idDocument": [{ "idType": "nationalidcard", "idNumber": "1234567", "issueDate": "2018-07-03", "expiryDate": "2021-07-03", "issuer": "UKPA", "issuerPlace": "GB", "issuerCountry": "GB" }], "postalAddress": { "addressLine1": "111 ABC Street", "city": "New York", "stateProvince": "New York", "postalCode": "ABCD", "country": "GB" }, "subjectName": { "title": "Mr", "firstName": "Luke", "middleName": "R", "lastName": "Skywalker", "fullName": "Luke R Skywalker", "nativeName": "ABC" }, "emailAddress": "luke.skywalkeraaabbb@gmail.com", "birthCountry": "GB" }, "requestingOrganisation": { "requestingOrganisationIdentifierType": "organisationid", "requestingOrganisationIdentifier": "testorganisation" }, "creationDate": "2021-05-04T14:10:57", "modificationDate": "2021-05-04T14:10:57", "requestDate": "2021-05-04T14:10:57" }
        ], {
          "Content-Type": "application/json",
          'x-records-available-count': 2,
          'x-records-returned-count': 2,
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(request.params).toHaveProperty('transactionType');
      expect(response.data.length).toBe(2);
      expect(response.headers).toHaveProperty('x-records-available-count');
      expect(response.headers).toHaveProperty('x-records-returned-count');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });
  })
});