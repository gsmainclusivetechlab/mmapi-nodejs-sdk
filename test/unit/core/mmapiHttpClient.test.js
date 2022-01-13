'use strict';

const mmapi = require('../../../lib/index');
const nock = require('nock');

describe('MobileMoneyApiHttpClient', function () {
  let environment = new mmapi.core.SandboxEnvironment('consumerKey', 'consumerSecret', 'apiKey', 'ENHANCED_LEVEL', 'https://e765d0c6-3d88-40d4-9fd8-ef93b154d663.mock.pstmn.io/callback');
  let environment2 = new mmapi.core.SandboxEnvironment('consumerKey2', 'consumerSecret2', 'apiKey2', 'ENHANCED_LEVEL', 'https://e765d0c6-3d88-40d4-9fd8-ef93b154d663.mock.pstmn.io/callback');

  beforeEach(function () {
    clearToken();
    this.http = new mmapi.core.MobileMoneyApiHttpClient(environment);
    this.http2 = new mmapi.core.MobileMoneyApiHttpClient(environment2);
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

  describe('Execute', function () {
    const authTokenHeader = authHeader(false);
    const authRefreshHeader = authHeader(true);

    it('Fetches access token if not yet fetched', async function () {
      const request = {
        url: '/heartbeat',
        method: 'get',
        headers: {}
      }

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .get(`${this.securityOptionUrl}${request.url}`)
        .reply(200, { serviceStatus: 'available' }, { 'Content-Type': 'application/json' });

      let accessTokenNock = mockAccessTokenRequest(this.context);

      const response = await this.http.execute(request);

      expect(response.status).toBe(200);
      expect(response.data.serviceStatus).toMatch(/^(available)$/);
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });

    it('Does not fetch access token if authorization header is already set on request', async function () {
      let request = {
        url: '/heartbeat',
        method: 'get',
        headers: {
          Authorization: 'custom authorization header'
        }
      };

      let expectedHeader = {
        reqheaders: {
          authorization: 'custom authorization header'
        }
      };

      let requestNock = nock(environment.baseUrl, expectedHeader)
        .get(`${this.securityOptionUrl}${request.url}`)
        .times(1).reply(200, { serviceStatus: 'available' }, { 'Content-Type': 'application/json' });

      expect(this.http._cache.getToken()).toBeFalsy();

      const response = await this.http.execute(request);
      let customToken = this.http._cache.getToken();
      expect(customToken).toBeFalsy();;
      expect(requestNock.isDone()).toBe(true);
      expect(response.data.serviceStatus).toMatch(/^(available)$/);
    });

    it('Does not fetch access token if not expired and still valid', async function () {
      let prevToken;
      let request = {
        url: '/heartbeat',
        method: 'get',
        headers: {
        }
      };

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .get(`${this.securityOptionUrl}${request.url}`)
        .times(2)
        .reply(200, { serviceStatus: 'available' }, { 'Content-Type': 'application/json' });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      this.http.execute(request).then((resp) => {
        expect(resp.data.serviceStatus).toMatch(/^(available)$/);
        this.http.execute(request).then((resp) => {
          expect(resp.data.serviceStatus).toMatch(/^(available)$/);
          expect(requestNock.isDone()).toBe(true);
          expect(accessTokenNock.isDone()).toBe(true);
        });
      });
    });

    it('Fetches an access token if expired without refresh token', async function () {
      let request = {
        url: '/heartbeat',
        method: 'get',
        headers: {
        }
      };

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .get(`${this.securityOptionUrl}${request.url}`)
        .times(2)
        .reply(200, { serviceStatus: 'available' }, { 'Content-Type': 'application/json' });

      let accessTokenNock = mockAccessTokenRequest(this.context, {
        expiresIn: -1,
        times: 2
      });

      this.http.execute(request).then(() => {
        this.http.execute(request).then(() => {
          expect(accessTokenNock.isDone()).toBe(true);
        });
      });
    });

    it('Fetches a new access token using a refresh token if expired', async function () {
      let request = {
        url: '/heartbeat',
        method: 'get',
        headers: {
        }
      };

      let requestNock = nock(environment.baseUrl, authRefreshHeader)
        .get(`${this.securityOptionUrl}${request.url}`)
        .times(2)
        .reply(200, { serviceStatus: 'available' }, { 'Content-Type': 'application/json' });

      let refreshTokenNock = mockAccessTokenRequest(this.context, {
        times: 2,
        refreshTokenResponse: true,
        refreshTokenValue: 'refresh-token'
      });

      this.http.execute(request).then(() => {
        this.http.execute(request).then(() => {
          expect(refreshTokenNock.isDone()).toBe(true);
          expect(requestNock.isDone()).toBe(true);
        });
      });
    });

    it('Synchronizes access token requests for the same client', async function () {
      let request = {
        url: '/heartbeat',
        method: 'get',
        headers: {
        }
      };

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .get(`${this.securityOptionUrl}${request.url}`)
        .times(2)
        .reply(200, { serviceStatus: 'available' }, { 'Content-Type': 'application/json' });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      Promise.all([
        this.http.execute(request),
        this.http.execute(request),
      ]).then((values) => {
        expect(requestNock.isDone()).toBe(true);
        expect(accessTokenNock.isDone()).toBe(true);
      })
    });

    it('Synchronizes access token requests for clients with the same credentials', async function () {
      let request = {
        url: '/heartbeat',
        method: 'get',
        headers: {
        }
      };

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .get(`${this.securityOptionUrl}${request.url}`)
        .times(2)
        .reply(200, { serviceStatus: 'available' }, { 'Content-Type': 'application/json' });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      let otherHttp = new mmapi.core.MobileMoneyApiHttpClient(environment);

      Promise.all([
        this.http.execute(request),
        otherHttp.execute(request),
      ]).then((values) => {
        expect(requestNock.isDone()).toBe(true);
        expect(accessTokenNock.isDone()).toBe(true);
      })
    });

    it('Does not synchronize access token requests for clients with different credentials', async function () {
      let request = {
        url: '/heartbeat',
        method: 'get',
        headers: {
        }
      };

      let successfulRequestNock = nock(environment.baseUrl, authTokenHeader)
        .get(`${this.securityOptionUrl}${request.url}`)
        .times(2)
        .reply(200, { serviceStatus: 'available' }, { 'Content-Type': 'application/json' });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 2 });

      Promise.all([
        this.http.execute(request),
        this.http2.execute(request),
      ]).then((values) => {
        expect(successfulRequestNock.isDone()).toBe(true);
        expect(accessTokenNock.isDone()).toBe(true);
      });
    });

    it('Retries calls on authorization errors', async function () {
      let request = {
        url: '/heartbeat',
        method: 'get',
        headers: {
        }
      };

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 2 });

      let rejectionNock = this.context.get(`${this.securityOptionUrl}${request.url}`).times(2).reply(401);

      let requestNock = this.context.get(`${this.securityOptionUrl}${request.url}`).times(2).reply(200, () => JSON.stringify({ serviceStatus: 'available' }), {
        'Content-Type': 'application/json'
      });

      Promise.all([
        this.http.execute(request),
        this.http.execute(request)
      ]).then((results) => {
        expect(accessTokenNock.isDone()).toBe(true);
        expect(rejectionNock.isDone()).toBe(true);
        expect(requestNock.isDone()).toBe(true);
        results.forEach((res) => {
          expect(resp.data.serviceStatus).toMatch(/^(available)$/);
        });
      });
    });

    it('Retries authorization calls on 401 errors only once', async function () {
      this.context.post('/v1/oauth2/token').times(2).reply(function (uri, requestBody) {
        return [
          401,
          'there was an error fetching your access token',
          {}
        ];
      });

      let request = {
        url: '/heartbeat',
        method: 'get',
        headers: {
        }
      };

      let requestNock = this.context.get(`${this.securityOptionUrl}${request.url}`).times(1).reply(200);

      this.http.execute(request).then((res) => {
        expect().fail('should have failed with 401 error');
      }).catch((err) => {
        expect(requestNock.isDone()).toBe(false);
        expect(requestNock.pendingMocks()).toBe(false);
        expect(err.statusCode).toBe(401);
        expect(err.message).toBe('there was an error fetching your access token');
      })
    });
  })
});