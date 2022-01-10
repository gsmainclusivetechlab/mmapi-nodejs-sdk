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
  const consumerKey = process.env.CONSUMER_KEY;
  const consumerSecret = process.env.CONSUMER_SECRET;
  const apiKey = process.env.API_KEY;
  const securityOption = process.env.SECURITY_OPTION; // DEVELOPMENT_LEVEL, STANDARD_LEVEL, ENHANCED_LEVEL
  const callbackUrl = process.env.CALLBACK_URL;

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
  environment,
  callbackUrl: process.env.CALLBACK_URL
};
