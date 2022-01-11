'use strict';

const mmapi = require('../../lib/index');
const nock = require('nock');

describe('Authorization Code', function () {
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

  describe('CreateAuthorisationCode', function () {
    const authTokenHeader = authHeader(false);
    const authRefreshHeader = authHeader(true);

    let request;

    beforeEach(async () => {
      request = new mmapi.merchantPayment.createAuthorisationCode({ 'msisdn': '+44012345678' });

      request.body({
        "requestDate": "2018-07-03T10:43:27.405Z",
        "currency": "GBP",
        "amount": "1000.00"
      })
    });

    afterEach(async () => {
    });

    it('should return the notification method polling by default', async function () {
      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .post(`${this.securityOptionUrl}${request.url}`, request.data)
        .reply(202, {
          "serverCorrelationId": "dae8ef64-4340-40b4-863e-ddbe9d63374b", "status": "pending", "notificationMethod": "polling", "objectReference": "1056", "pollLimit": 100
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
          "serverCorrelationId": "dae8ef64-4340-40b4-863e-ddbe9d63374b", "status": "pending", "notificationMethod": "callback", "objectReference": "1056", "pollLimit": 100
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
          "serverCorrelationId": "dae8ef64-4340-40b4-863e-ddbe9d63374b", "status": "pending", "notificationMethod": "polling", "objectReference": "1056", "pollLimit": 100
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

    it('should return request data with property amount if amount is invoked', async function () {
      request.amount("1000.00");

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .post(`${this.securityOptionUrl}${request.url}`, request.data)
        .reply(202, {
          "serverCorrelationId": "dae8ef64-4340-40b4-863e-ddbe9d63374b", "status": "pending", "notificationMethod": "polling", "objectReference": "1056", "pollLimit": 100
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(request.data).toHaveProperty('amount');
      expect(response.status).toBe(202);
      expect(response.data).toHaveProperty('status');
      expect(response.data.status).toBe('pending');
      expect(response.data).toHaveProperty('serverCorrelationId');
      expect(response.data).toHaveProperty('notificationMethod');
      expect(response.data.notificationMethod).toBe('polling');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });

    it('should return request data with property currency if currency is invoked', async function () {
      request.currency("GBP");

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .post(`${this.securityOptionUrl}${request.url}`, request.data)
        .reply(202, {
          "serverCorrelationId": "dae8ef64-4340-40b4-863e-ddbe9d63374b", "status": "pending", "notificationMethod": "polling", "objectReference": "1056", "pollLimit": 100
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(request.data).toHaveProperty('currency');
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
      request.requestDate("2018-07-03T10:43:27.405Z");

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .post(`${this.securityOptionUrl}${request.url}`, request.data)
        .reply(202, {
          "serverCorrelationId": "dae8ef64-4340-40b4-863e-ddbe9d63374b", "status": "pending", "notificationMethod": "polling", "objectReference": "1056", "pollLimit": 100
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

    it('should return request data with property amountType if amountType is invoked', async function () {
      request.amountType("exact");

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .post(`${this.securityOptionUrl}${request.url}`, request.data)
        .reply(202, {
          "serverCorrelationId": "dae8ef64-4340-40b4-863e-ddbe9d63374b", "status": "pending", "notificationMethod": "polling", "objectReference": "1056", "pollLimit": 100
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(request.data).toHaveProperty('amountType');
      expect(response.status).toBe(202);
      expect(response.data).toHaveProperty('status');
      expect(response.data.status).toBe('pending');
      expect(response.data).toHaveProperty('serverCorrelationId');
      expect(response.data).toHaveProperty('notificationMethod');
      expect(response.data.notificationMethod).toBe('polling');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });

    it('should return request data with property codeLifetime if codeLifetime is invoked', async function () {
      request.codeLifetime(1);

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .post(`${this.securityOptionUrl}${request.url}`, request.data)
        .reply(202, {
          "serverCorrelationId": "dae8ef64-4340-40b4-863e-ddbe9d63374b", "status": "pending", "notificationMethod": "polling", "objectReference": "1056", "pollLimit": 100
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(request.data).toHaveProperty('codeLifetime');
      expect(response.status).toBe(202);
      expect(response.data).toHaveProperty('status');
      expect(response.data.status).toBe('pending');
      expect(response.data).toHaveProperty('serverCorrelationId');
      expect(response.data).toHaveProperty('notificationMethod');
      expect(response.data.notificationMethod).toBe('polling');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });

    it('should return request data with property holdFundsIndicator if holdFundsIndicator is invoked', async function () {
      request.holdFundsIndicator(true);

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .post(`${this.securityOptionUrl}${request.url}`, request.data)
        .reply(202, {
          "serverCorrelationId": "dae8ef64-4340-40b4-863e-ddbe9d63374b", "status": "pending", "notificationMethod": "polling", "objectReference": "1056", "pollLimit": 100
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(request.data).toHaveProperty('holdFundsIndicator');
      expect(response.status).toBe(202);
      expect(response.data).toHaveProperty('status');
      expect(response.data.status).toBe('pending');
      expect(response.data).toHaveProperty('serverCorrelationId');
      expect(response.data).toHaveProperty('notificationMethod');
      expect(response.data.notificationMethod).toBe('polling');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });

    it('should return request data with property redemptionAccountIdentifiers if redemptionAccountIdentifiers is invoked', async function () {
      request.redemptionAccountIdentifiers([{ "accountid": "1" }]);

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .post(`${this.securityOptionUrl}${request.url}`, request.data)
        .reply(202, {
          "serverCorrelationId": "dae8ef64-4340-40b4-863e-ddbe9d63374b", "status": "pending", "notificationMethod": "polling", "objectReference": "1056", "pollLimit": 100
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(request.data).toHaveProperty('redemptionAccountIdentifiers');
      expect(response.status).toBe(202);
      expect(response.data).toHaveProperty('status');
      expect(response.data.status).toBe('pending');
      expect(response.data).toHaveProperty('serverCorrelationId');
      expect(response.data).toHaveProperty('notificationMethod');
      expect(response.data.notificationMethod).toBe('polling');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });

    it('should return request data with property redemptionChannels if redemptionChannels is invoked', async function () {
      request.redemptionChannels("channelType");

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .post(`${this.securityOptionUrl}${request.url}`, request.data)
        .reply(202, {
          "serverCorrelationId": "dae8ef64-4340-40b4-863e-ddbe9d63374b", "status": "pending", "notificationMethod": "polling", "objectReference": "1056", "pollLimit": 100
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(request.data).toHaveProperty('redemptionChannels');
      expect(response.status).toBe(202);
      expect(response.data).toHaveProperty('status');
      expect(response.data.status).toBe('pending');
      expect(response.data).toHaveProperty('serverCorrelationId');
      expect(response.data).toHaveProperty('notificationMethod');
      expect(response.data.notificationMethod).toBe('polling');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });

    it('should return request data with property redemptionTransactionTypes if redemptionTransactionTypes is invoked', async function () {
      request.redemptionTransactionTypes("redemptionTransactionTypes");

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .post(`${this.securityOptionUrl}${request.url}`, request.data)
        .reply(202, {
          "serverCorrelationId": "dae8ef64-4340-40b4-863e-ddbe9d63374b", "status": "pending", "notificationMethod": "polling", "objectReference": "1056", "pollLimit": 100
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(request.data).toHaveProperty('redemptionTransactionTypes');
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
          "serverCorrelationId": "dae8ef64-4340-40b4-863e-ddbe9d63374b", "status": "pending", "notificationMethod": "polling", "objectReference": "1056", "pollLimit": 100
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

    it('should return request data with property customData if customData is invoked', async function () {
      request.customData("customData");

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .post(`${this.securityOptionUrl}${request.url}`, request.data)
        .reply(202, {
          "serverCorrelationId": "dae8ef64-4340-40b4-863e-ddbe9d63374b", "status": "pending", "notificationMethod": "polling", "objectReference": "1056", "pollLimit": 100
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

    it('should return request data with property metadata if metadata is invoked', async function () {
      request.metadata([{ "key": "value" }]);

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .post(`${this.securityOptionUrl}${request.url}`, request.data)
        .reply(202, {
          "serverCorrelationId": "dae8ef64-4340-40b4-863e-ddbe9d63374b", "status": "pending", "notificationMethod": "polling", "objectReference": "1056", "pollLimit": 100
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(request.data).toHaveProperty('metadata');
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

  describe('ViewAuthorisationCode', function () {
    const authTokenHeader = authHeader(false);
    const authRefreshHeader = authHeader(true);

    let request;

    beforeEach(async () => {
      request = new mmapi.merchantPayment.viewAuthorisationCode({ 'msisdn': '+44012345678' }, 'ad922511-77ae-4c17-b674-f85a96fffbf7');
    })

    afterEach(async () => {
    });

    it('should return the authorization code object if request is valid', async function () {
      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .get(`${this.securityOptionUrl}${request.url}`)
        .reply(200, {
          "authorisationCode": "ad922511-77ae-4c17-b674-f85a96fffbf7", "codeState": "active", "amount": "1000.00", "currency": "GBP", "redemptionAccountIdentifiers": [{ "key": "accountid", "value": "2000" }, { "key": "linkref", "value": "REF-1621839627337" }, { "key": "linkref", "value": "REF-1635445811066" }], "creationDate": "2021-11-16T15:42:05", "modificationDate": "2021-11-16T15:42:05", "requestDate": "2018-07-03T10:43:27"
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('authorisationCode');
      expect(response.data).toHaveProperty('codeState');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });
  })
});