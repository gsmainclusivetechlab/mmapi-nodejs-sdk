/* eslint-disable max-len */

const { HttpClient } = require('./HttpClient');
const { ObtainAnAccessTokenRequest } = require('./obtainAnAccessTokenRequest');
const { AccessToken } = require('./accessToken');
const TokenCache = require('./tokenCache').TokenCache;

/**
 * MobileMoneyApiHttpClient
 */

class MobileMoneyApiHttpClient extends HttpClient {

  /**
   * @param {MobileMoneyApiEnvironment} environment - The environment for this client
   * @param {string} refreshToken - The refreshToken to be used to generate the access Token.
   */
  constructor(environment, refreshToken) {
    super(environment);

    this._cache = TokenCache.cacheForEnvironment(environment);

    this.addInjector(function headerAndUrlInjector(req) {

      if (req.constructor.name === 'ObtainAnAccessTokenRequest') {
        return;
      }

      switch (environment.securityOption) {
        case 'DEVELOPMENT_LEVEL':
          req.headers.Authorization = environment.authorizationString();
          req.url = `/2/oauth/simulator/v1.2/mm${req.url}`;
          break;
        case 'STANDARD_LEVEL':
        case 'ENHANCED_LEVEL':
          req.headers['X-API-Key'] = environment.apiKey;
          req.url = `/2/oauth/simulator/v1.2/mm${req.url}`;
          break;
        default:
          req.url = `/simulator/v1.2/passthrough/mm${req.url}`
          break;
      }
    });

    this.addInjector(authInjector.bind(this));
  }

  execute(request) {
    return super.execute(request).catch((err) => {
      if (err.status === 401) {
        return this._retryRequest(request);
      }
      return Promise.reject(err);
    });
  }

  _retryRequest(request) {
    const promise = this._cache.wait(request).then(() => {
      this._setAuthHeader(request);
      return super.execute(request);
    });

    if (this._cache.isLocked()) {
      return promise;
    }

    // Avoids node UnhandledPromiseRejectionWarning on access token failure.
    return Promise.race([this.ObtainAnAccessTokenRequest(), promise]).then(() => promise);
  }

  ObtainAnAccessTokenRequest() {
    this._cache.lock();
    return super.execute(new ObtainAnAccessTokenRequest(this.environment)).then((response) => {
      const token = new AccessToken(response.data);
      this._cache.setToken(token);
      this._cache.notify();
      this._cache.unlock();
      return Promise.resolve(token);
    }).catch((err) => {
      this._cache.setToken(null);
      this._cache.notify(err);
      this._cache.unlock();
      return Promise.reject(err);
    });
  }

  /**
   * Sets the Authorization header for this request based on the client token
   * @param {Object} request - The request to modify
   * @private
   * @return {void}
   */
  _setAuthHeader(request) {
    const token = this._cache.getToken();

    request.headers = request.headers || {};
    request.headers.Authorization = token.authorizationString();
  }
}

/**
 * An injector that fetches token when the client has no token or is expired and queues calls if the token is refreshing
 * @param {Object} request - The current request for the client
 * @return {Promise.<any>} Promise that fetches a new access Token
 */
function authInjector(request) {
  if (request.headers.Authorization) {
    return;
  }
  if (this._cache.isValid()) {
    this._setAuthHeader(request);
  } else if (this._cache.isLocked()) {
    return this._cache.wait(request)
      .then(() => this._setAuthHeader(request));
  } else if (!this._cache.isValid()) {
    return Promise.all([
      this._cache.wait(request),
      this.ObtainAnAccessTokenRequest()
    ]).then(() => this._setAuthHeader(request));
  }
}



module.exports = {
  MobileMoneyApiHttpClient,
};
