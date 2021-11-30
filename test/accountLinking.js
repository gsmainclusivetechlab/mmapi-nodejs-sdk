const {
  viewAccountBalance,
  viewServiceAvailability,
  viewResponse,
  viewResource,
  createAccountLink,
  createTransferTransaction,
  viewRequestState,
  viewTransaction,
  createReversal,
  viewAccountTransactions,
  viewAccountLink
} = require('../samples/index');

const buildAccountLinkRequestBody = () => ({
  "sourceAccountIdentifiers": [
    {
      "key": "accountid",
      "value": "2999"
    }
  ],
  "status": "active",
  "mode": "both",
  "customData": [
    {
      "key": "keytest",
      "value": "keyvalue"
    }
  ],
  "requestingOrganisation": {
    "requestingOrganisationIdentifierType": "organisationid",
    "requestingOrganisationIdentifier": "12345"
  }
});

const buildTransferTransactionRequestBody = (linkReference) => ({
  "amount": "200.00",
  "creditParty": [
    {
      "key": "linkref",
      "value": `${linkReference}`
    }
  ],
  "currency": "RWF",
  "debitParty": [
    {
      "key": "accountid",
      "value": "2999"
    }
  ]
});

const usecase1 = async () => {
  console.log("Setup an Account Link...");

  console.log("POST Establish an Account to Account Link")
  await createAccountLink(buildAccountLinkRequestBody(), 'accountid', '2000', 'accountLinking', undefined, true);
}

const usecase2 = async () => {
  console.log("Setup an Account Link using the Polling Method...");

  console.log("POST Establish an Account to Account Link");
  const { data: { serverCorrelationId } } = await createAccountLink(buildAccountLinkRequestBody(), 'accountid', '2000', 'accountLinking', true, true);

  console.log('GET Poll to Determine the Request State')
  const { data: { objectReference } } = await viewRequestState(serverCorrelationId, 'accountLinking', true);

  console.log('GET View A Link');
  await viewAccountLink('accountid', '2000', objectReference, 'accountLinking', true);
}

const usecase3 = async () => {
  console.log("Perform a Transfer for a Linked Account...");

  console.log("POST Use a Link to make a Transfer");
  await createTransferTransaction(buildTransferTransactionRequestBody('REF-1638280960220'), 'accountLinking', undefined, true);
}

(async (usecase) => {
  switch (usecase) {
    case 1:
      await usecase1();
      break;
    case 2:
      await usecase2();
      break;
    case 3:
      await usecase3();
      break;
    default:
      await usecase1();
      await usecase2();
      await usecase3();
  }
})(2);