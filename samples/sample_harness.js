require('dotenv').config()

/**
 * MobileMoneyApi Node JS SDK dependency
 */
const mmapi = require('../lib/index');

/**
 * Setting up and Returns MobileMoneyApi SDK environment with MobileMoneyApi Access credentials.
 * For demo purpose, we are using SandboxEnvironment. In production this will be LiveEnvironment.
 */
const environment = () => {
  const consumerKey = process.env.CONSUMER_KEY || '59vthmq3f6i15v6jmcjskfkmh'
  const consumerSecret = process.env.CONSUMER_SECRET || 'ef8tl4gihlpfd7r8jpc1t1nda33q5kcnn32cj375lq6mg2nv7rb'
  const apiKey = process.env.API_KEY || 'oVN89kXyTx1cKT3ZohH7h6foEmQmjqQm3OK2U8Ue'
  const securityOption = process.env.SECURITY_OPTION || 'STANDARD_LEVEL' // DEVELOPMENT_LEVEL, STANDARD_LEVEL, ENHANCED_LEVEL
  const callbackUrl = process.env.CALLBACK_URL || 'https://322894a8-6c41-4b35-80cc-7fbfec49c4a2.mock.pstmn.io/pramisha'

  if (process.env.NODE_ENV === 'production') {
    return new mmapi.core.LiveEnvironment(consumerKey, consumerSecret, apiKey, securityOption, callbackUrl);
  }

  return new mmapi.core.SandboxEnvironment(consumerKey, consumerSecret, apiKey, securityOption, callbackUrl);
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
