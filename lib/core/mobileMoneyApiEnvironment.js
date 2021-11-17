/* eslint-disable max-params */
/* eslint-disable max-classes-per-file */
const { Environment } = require('./environment');

const SANDBOX = 'https://sandbox.mobilemoneyapi.io';
const LIVE = 'https://sandbox.mobilemoneyapi.io';

/**
 * Base class for Mobile Money API Environments
 */
// eslint-disable-next-line padded-blocks
class MobileMoneyApiEnvironment extends Environment {

  /**
   * @param {string} consumerKey - The consumer key for this environment
   * @param {string} consumerSecret - The consumer secret
   * @param {string} apiKey - The api Key
   * @param {string} baseUrl - The base url to execute requests
   * @param {string} webUrl - The web url to authorize user's consent
   */
  // eslint-disable-next-line max-params
  constructor(consumerKey, consumerSecret, apiKey, securityOption, callbackUrl, baseUrl) {
    super(baseUrl);
    this.consumerKey = consumerKey;
    this.consumerSecret = consumerSecret;
    this.apiKey = apiKey;
    this.securityOption = securityOption;
    this.callbackUrl = callbackUrl;
  }

  /**
   * Authorization header string for basic authentication with the current consumer key and secret
   * @return {string} - The authorization header value
   */
  authorizationString() {
    const encoded = Buffer.from(`${this.consumerKey}:${this.consumerSecret}`).toString('base64');
    return `Basic ${encoded}`;
  }
}

/**
 * Sandbox Environment
 */
class SandboxEnvironment extends MobileMoneyApiEnvironment {
  constructor(consumerKey, consumerSecret, apiKey, securityOption, callbackUrl) {
    super(consumerKey, consumerSecret, apiKey, securityOption, callbackUrl, SANDBOX);
  }
}

/**
 * Live Environment
 */
class LiveEnvironment extends MobileMoneyApiEnvironment {
  constructor(consumerKey, consumerSecret, apiKey, securityOption, callbackUrl) {
    super(consumerKey, consumerSecret, apiKey, securityOption, callbackUrl, LIVE);
  }
}

module.exports = {
  LiveEnvironment,
  MobileMoneyApiEnvironment,
  SandboxEnvironment,
};
