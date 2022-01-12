'use strict';

const mmapi = require('../../lib/index');
const nock = require('nock');

describe('Supporting', function () {
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

  describe('ViewRequestState', function () {
    const authTokenHeader = authHeader(false);
    const authRefreshHeader = authHeader(true);

    let request;

    beforeEach(async () => {
      request = new mmapi.merchantPayment.viewRequestState("8626661d-2b3a-4166-b3d2-33a0c5fccd35");
    })

    afterEach(async () => {
    });

    it('should return the request state object if request is valid', async function () {
      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .get(`${this.securityOptionUrl}${request.url}`)
        .reply(200, {
          "serverCorrelationId": "8626661d-2b3a-4166-b3d2-33a0c5fccd35", "status": "completed", "notificationMethod": "polling", "objectReference": "REF-1635488317033", "pollLimit": 100
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('status');
      expect(response.data.status).toMatch(/^(pending|completed|failed)$/);
      expect(response.data).toHaveProperty('serverCorrelationId');
      expect(response.data).toHaveProperty('notificationMethod');
      expect(response.data.notificationMethod).toBe('polling');
      expect(response.data).toHaveProperty('objectReference');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });
  })

  describe('ViewResource', function () {
    const authTokenHeader = authHeader(false);
    const authRefreshHeader = authHeader(true);

    let request;

    beforeEach(async () => {
      request = new mmapi.merchantPayment.viewResource("/transactions/REF-1635433380991");
    })

    afterEach(async () => {
    });

    it('should return the representation of the missing resource if request is valid', async function () {
      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .get(`${this.securityOptionUrl}${request.url}`)
        .reply(200, {
          "transactionReference": "REF-1635433380991", "creditParty": [{ "key": "accountid", "value": "2999" }], "debitParty": [{ "key": "accountid", "value": "2999" }], "type": "merchantpay", "transactionStatus": "pending", "amount": "200.00", "currency": "RWF", "creationDate": "2021-10-28T18:42:35", "modificationDate": "2021-10-28T18:42:35", "requestDate": "2021-10-28T18:42:35"
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

  describe('ViewResponse', function () {
    const authTokenHeader = authHeader(false);
    const authRefreshHeader = authHeader(true);

    let request;

    beforeEach(async () => {
      request = new mmapi.merchantPayment.viewResponse("Abcdefgh");
    })

    afterEach(async () => {
    });

    it('should return the link containing the representation of the missing resource if request is valid', async function () {
      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .get(`${this.securityOptionUrl}${request.url}`)
        .reply(200, {
          "link": "/transactions/REF-1635433380991"
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('link');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });
  })

  describe('ViewServiceAvailability', function () {
    const authTokenHeader = authHeader(false);
    const authRefreshHeader = authHeader(true);

    let request;

    beforeEach(async () => {
      request = new mmapi.merchantPayment.viewServiceAvailability();
    })

    afterEach(async () => {
    });

    it('should return return the heartbeat object if request is valid', async function () {
      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .get(`${this.securityOptionUrl}${request.url}`)
        .reply(200, {
          "serviceStatus": "available"
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('serviceStatus');
      expect(response.data.serviceStatus).toMatch(/^(available|unavailable|degraded)$/);
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });
  })
});