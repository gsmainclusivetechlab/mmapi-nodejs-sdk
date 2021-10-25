'use strict';

/**
 * MobileMoneyApi Node JS SDK dependency
 */
const mmapi = require('../lib/index');

/**
 * Setting up and Returns MobileMoneyApi SDK environment with MobileMoneyApi Access credentials.
 * For demo purpose, we are using SandboxEnvironment. In production this will be LiveEnvironment.
 */
const environment = () => {
  const consumerKey = process.env.MOBILE_MONEY_API_CONSUMER_KEY || '59vthmq3f6i15v6jmcjskfkmh';
  const consumerSecret = process.env.MOBILE_MONEY_API_CONSUMER_SECRET || 'ef8tl4gihlpfd7r8jpc1t1nda33q5kcnn32cj375lq6mg2nv7rb';
  const apiKey = process.env.MOBILE_MONEY_API_API_KEY || 'oVN89kXyTx1cKT3ZohH7h6foEmQmjqQm3OK2U8Ue';
  const securityOption = process.env.SECURITY_OPTION || 'STANDARD_LEVEL'; // NO_AUTH, DEVELOPMENT_LEVEL, STANDARD_LEVEL, ENHANCED_LEVEL

  if (process.env.NODE_ENV === 'production') {
    return new mmapi.core.LiveEnvironment(consumerKey, consumerSecret, apiKey, securityOption,);
  }

  return new mmapi.core.SandboxEnvironment(consumerKey, consumerSecret, apiKey, securityOption,);
};

/**
 * Returns MobileMoneyApi HTTP client instance with environment which has access
 * credentials context. This can be used invoke MobileMoneyApi API's provided the
 * credentials have the access to do so.
 */
const client = () => new mmapi.core.MobileMoneyApiHttpClient(environment());

module.exports = {
  client,
  environment
};
