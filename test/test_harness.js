require('dotenv').config()

const mobileMoneyApi = require('../lib/index').core;

const environment = () => {
  const consumerKey = process.env.CONSUMER_KEY;
  const consumerSecret = process.env.CONSUMER_SECRET;
  const apiKey = process.env.API_KEY;
  const securityOption = process.env.SECURITY_OPTION; // optional  DEVELOPMENT_LEVEL, STANDARD_LEVEL, ENHANCED_LEVEL
  const callbackUrl = process.env.CALLBACK_URL;

  return new mobileMoneyApi.SandboxEnvironment(
    consumerKey, consumerSecret, apiKey, securityOption, callbackUrl
  );
};

const client = () => new mobileMoneyApi.MobileMoneyApiHttpClient(environment());

module.exports = {
  client,
  environment,
};
