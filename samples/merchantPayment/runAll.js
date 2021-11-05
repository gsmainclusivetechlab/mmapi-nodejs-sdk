const { createAMerchantPayTransaction, createAMerchantPayTransactionPolling } = require('./createAMerchantPayTransaction');
const { createARefundTransaction } = require('./createARefundTransaction');
const { createAnAuthorisationCode } = require('./createAnAuthorisationCode');

const { createAReversal } = require('../common/createAReversal');
const { viewAccountBalance } = require('../common/viewAccountBalance');
const { viewAccountSpecificTransaction } = require('../common/viewAccountSpecificTransaction');
const { checkApiAvailability } = require('../common/checkApiAvailability');
const { viewAResponse } = require('../common/viewAResponse');
const { viewARequestState } = require('../common/viewARequestState');
const { viewATransaction } = require('../common/viewATransaction');
const { viewAResource } = require('../common/viewAResource');



(async () => {
  console.log("Creating Order...");

  PerformAPayeeInitiatedMerchantPayment

})();

PerformAPayeeInitiatedMerchantPayment = async () => {
  console.log("Perform a Payee-Initiated Merchant Payment...");
  const response = await createAMerchantPayTransaction();

  console.log("Response Status: ", response.status);
  console.log("Response Data: ", JSON.stringify(response.data, null, 4));
  console.log("Response Headers: ", response.headers);
}
