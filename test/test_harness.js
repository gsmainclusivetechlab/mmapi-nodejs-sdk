const mobileMoneyApi = require('../lib/index').core;

const environment = () => {
  const consumerKey = process.env.MOBILE_MONEY_API_CONSUMER_KEY || '59vthmq3f6i15v6jmcjskfkmh';
  const consumerSecret = process.env.MOBILE_MONEY_API_CONSUMER_SECRET || 'ef8tl4gihlpfd7r8jpc1t1nda33q5kcnn32cj375lq6mg2nv7rb';
  const apiKey = process.env.MOBILE_MONEY_API_API_KEY || 'oVN89kXyTx1cKT3ZohH7h6foEmQmjqQm3OK2U8Ue';
  const securityOption = process.env.SECURITY_OPTION || 'STANDARD_LEVEL'; // optional  DEVELOPMENT_LEVEL, STANDARD_LEVEL, ENHANCED_LEVEL
  const callbackUrl = process.env.CALLBACK_URL || 'https://322894a8-6c41-4b35-80cc-7fbfec49c4a2.mock.pstmn.io/pramisha';

  return new mobileMoneyApi.SandboxEnvironment(
    consumerKey, consumerSecret, apiKey, securityOption, callbackUrl
  );
};

const client = () => new mobileMoneyApi.MobileMoneyApiHttpClient(environment());

module.exports = {
  client,
  environment,
};
