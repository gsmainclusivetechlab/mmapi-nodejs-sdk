'use strict';

const mmapi = require('../../../lib/index');
const nock = require('nock');

describe('Batch Transactions', function () {
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

  describe('CreateBatchTransaction', function () {
    const authTokenHeader = authHeader(false);
    const authRefreshHeader = authHeader(true);

    let request;

    beforeEach(async () => {
      request = new mmapi.disbursement.createBatchTransaction();

      request.body({
        "transactions": [
          {
            "amount": "16.00",
            "type": "transfer",
            "creditParty": [
              {
                "key": "msisdn",
                "value": "+44012345678"
              }
            ],
            "currency": "USD",
            "debitParty": [
              {
                "key": "walletid",
                "value": "1"
              }
            ]
          },
          {
            "amount": "16.00",
            "type": "transfer",
            "creditParty": [
              {
                "key": "msisdn",
                "value": "+44012345678"
              }
            ],
            "currency": "USD",
            "debitParty": [
              {
                "key": "walletid",
                "value": "1"
              }
            ]
          }
        ],
        "batchTitle": "Batch_Test",
        "batchDescription": "Testing a Batch",
        "scheduledStartDate": "2019-12-11T15:08:03.158Z"
      });
    })

    afterEach(async () => {
    });

    it('should return the notification method polling by default', async function () {
      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .post(`${this.securityOptionUrl}${request.url}`, request.data)
        .reply(202, {
          "serverCorrelationId": "8a8e8d59-8f3b-40a7-b9cc-1fdb63358a75", "status": "pending", "notificationMethod": "polling", "objectReference": "429", "pollLimit": 100
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
          "serverCorrelationId": "8a8e8d59-8f3b-40a7-b9cc-1fdb63358a75", "status": "pending", "notificationMethod": "callback", "objectReference": "429", "pollLimit": 100
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
          "serverCorrelationId": "8a8e8d59-8f3b-40a7-b9cc-1fdb63358a75", "status": "pending", "notificationMethod": "polling", "objectReference": "429", "pollLimit": 100
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

    it('should return request data with property batchStatus if batchStatus is invoked', async function () {
      request.batchStatus("created");

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .post(`${this.securityOptionUrl}${request.url}`, request.data)
        .reply(202, {
          "serverCorrelationId": "8a8e8d59-8f3b-40a7-b9cc-1fdb63358a75", "status": "pending", "notificationMethod": "polling", "objectReference": "429", "pollLimit": 100
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(request.data).toHaveProperty('batchStatus');
      expect(response.status).toBe(202);
      expect(response.data).toHaveProperty('status');
      expect(response.data.status).toBe('pending');
      expect(response.data).toHaveProperty('serverCorrelationId');
      expect(response.data).toHaveProperty('notificationMethod');
      expect(response.data.notificationMethod).toBe('polling');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });

    it('should return request data with property transactions if transactions is invoked', async function () {
      request.transactions([]);

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .post(`${this.securityOptionUrl}${request.url}`, request.data)
        .reply(202, {
          "serverCorrelationId": "8a8e8d59-8f3b-40a7-b9cc-1fdb63358a75", "status": "pending", "notificationMethod": "polling", "objectReference": "429", "pollLimit": 100
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(request.data).toHaveProperty('transactions');
      expect(response.status).toBe(202);
      expect(response.data).toHaveProperty('status');
      expect(response.data.status).toBe('pending');
      expect(response.data).toHaveProperty('serverCorrelationId');
      expect(response.data).toHaveProperty('notificationMethod');
      expect(response.data.notificationMethod).toBe('polling');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });

    it('should return request data with property batchTitle if batchTitle is invoked', async function () {
      request.batchTitle("example");

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .post(`${this.securityOptionUrl}${request.url}`, request.data)
        .reply(202, {
          "serverCorrelationId": "8a8e8d59-8f3b-40a7-b9cc-1fdb63358a75", "status": "pending", "notificationMethod": "polling", "objectReference": "429", "pollLimit": 100
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(request.data).toHaveProperty('batchTitle');
      expect(response.status).toBe(202);
      expect(response.data).toHaveProperty('status');
      expect(response.data.status).toBe('pending');
      expect(response.data).toHaveProperty('serverCorrelationId');
      expect(response.data).toHaveProperty('notificationMethod');
      expect(response.data.notificationMethod).toBe('polling');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });

    it('should return request data with property batchDescription if batchDescription is invoked', async function () {
      request.batchDescription("example description");

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .post(`${this.securityOptionUrl}${request.url}`, request.data)
        .reply(202, {
          "serverCorrelationId": "8a8e8d59-8f3b-40a7-b9cc-1fdb63358a75", "status": "pending", "notificationMethod": "polling", "objectReference": "429", "pollLimit": 100
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(request.data).toHaveProperty('batchDescription');
      expect(response.status).toBe(202);
      expect(response.data).toHaveProperty('status');
      expect(response.data.status).toBe('pending');
      expect(response.data).toHaveProperty('serverCorrelationId');
      expect(response.data).toHaveProperty('notificationMethod');
      expect(response.data.notificationMethod).toBe('polling');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });

    it('should return request data with property requestingOrganisation if requestingOrganisation is invoked', async function () {
      request.requestingOrganisation({
        "requestingOrganisationIdentifierType": "organisationid",
        "requestingOrganisationIdentifier": "12345"
      });

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .post(`${this.securityOptionUrl}${request.url}`, request.data)
        .reply(202, {
          "serverCorrelationId": "8a8e8d59-8f3b-40a7-b9cc-1fdb63358a75", "status": "pending", "notificationMethod": "polling", "objectReference": "429", "pollLimit": 100
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(request.data).toHaveProperty('requestingOrganisation');
      expect(response.status).toBe(202);
      expect(response.data).toHaveProperty('status');
      expect(response.data.status).toBe('pending');
      expect(response.data).toHaveProperty('serverCorrelationId');
      expect(response.data).toHaveProperty('notificationMethod');
      expect(response.data.notificationMethod).toBe('polling');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });

    it('should return request data with property scheduledStartDate if scheduledStartDate is invoked', async function () {
      request.scheduledStartDate("2019-12-11T15:08:03.158Z");

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .post(`${this.securityOptionUrl}${request.url}`, request.data)
        .reply(202, {
          "serverCorrelationId": "8a8e8d59-8f3b-40a7-b9cc-1fdb63358a75", "status": "pending", "notificationMethod": "polling", "objectReference": "429", "pollLimit": 100
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(request.data).toHaveProperty('scheduledStartDate');
      expect(response.status).toBe(202);
      expect(response.data).toHaveProperty('status');
      expect(response.data.status).toBe('pending');
      expect(response.data).toHaveProperty('serverCorrelationId');
      expect(response.data).toHaveProperty('notificationMethod');
      expect(response.data.notificationMethod).toBe('polling');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });

    it('should return request data with property requestDate if requestDate is invoked', async function () {
      request.requestDate("2019-12-11T15:08:03.158Z");

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .post(`${this.securityOptionUrl}${request.url}`, request.data)
        .reply(202, {
          "serverCorrelationId": "8a8e8d59-8f3b-40a7-b9cc-1fdb63358a75", "status": "pending", "notificationMethod": "polling", "objectReference": "429", "pollLimit": 100
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

    it('should return request data with property customData if customData is invoked', async function () {
      request.customData("{ key: value}");

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .post(`${this.securityOptionUrl}${request.url}`, request.data)
        .reply(202, {
          "serverCorrelationId": "8a8e8d59-8f3b-40a7-b9cc-1fdb63358a75", "status": "pending", "notificationMethod": "polling", "objectReference": "429", "pollLimit": 100
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
  })
});