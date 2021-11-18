const {
  viewAccountName,
  createQuotation,
  createTransferTransaction,
  viewRequestState
} = require('../unit/index')

const buildQuotationRequestBody = () => ({
  "creditParty": [
    {
      "key": "accountid",
      "value": "2000"
    }
  ],
  "debitParty": [
    {
      "key": "accountid",
      "value": "2999"
    }
  ],
  "requestAmount": "75.30",
  "requestCurrency": "RWF",
  "requestDate": "2018-07-03T11:43:27.405Z",
  "type": "transfer",
  "subType": "abc",
  "chosenDeliveryMethod": "directtoaccount",
  "customData": [
    {
      "key": "keytest",
      "value": "keyvalue"
    }
  ]
});

const buildTransferTransactionRequestBody = (quotationReference) => ({
  "amount": "100.00",
  "creditParty": [
    {
      "key": "accountid",
      "value": "2000"
    }
  ],
  "currency": "GBP",
  "debitParty": [
    {
      "key": "accountid",
      "value": "2999"
    }
  ],
  "internationalTransferInformation": {
    "originCountry": "AD",
    "quotationReference": `${quotationReference}`,
    // "quoteId": "{{quoteId}}",
    "remittancePurpose": "personal",
    "deliveryMethod": "agent"
  },
  "requestingOrganisation": {
    "requestingOrganisationIdentifierType": "organisationid",
    "requestingOrganisationIdentifier": "testorganisation"
  }
});

const usecase1 = async () => {
  console.log("Perform a P2P Transfer via Switch...");

  console.log("GET Retrieve the Name of the Recipient");
  await viewAccountName('walletid', '1', true);

  console.log("POST Request a P2P Quotation");
  await createQuotation(buildQuotationRequestBody(), undefined, true);

  // console.log('GET View A Quotation')
  // await viewQuotation(objectReference, true);

  console.log('POST Perform a P2P Transfer')
  const { data: { serverCorrelationId } } = await createTransferTransaction(buildTransferTransactionRequestBody('REF-1637249499739'), undefined, true);

  console.log('GET Poll to Determine the Request State')
  const { data: { objectReference } } = await viewRequestState(serverCorrelationId, true);

  console.log('GET Retrieve a Transaction')
  await viewTransaction(objectReference, true)
}

const usecase2 = async () => {
  console.log("Perform a Bilateral P2P Transfer...");

  console.log("GET Retrieve the Name of the Recipient");
  await viewAccountName('walletid', '1', true);

  console.log('POST Perform a P2P Transfer')
  const body = {
    "amount": "100.00",
    "creditParty": [
      {
        "key": "accountid",
        "value": "2000"
      }
    ],
    "currency": "GBP",
    "debitParty": [
      {
        "key": "accountid",
        "value": "2999"
      }
    ],
    "requestingOrganisation": {
      "requestingOrganisationIdentifierType": "organisationid",
      "requestingOrganisationIdentifier": "testorganisation"
    }
  }
  await createTransferTransaction(body, undefined, true);
}

const usecase3 = async () => {
  console.log("Perform an ‘On-us’ P2P Transfer Initiated by a Third Party Provider...");

  console.log("GET Retrieve the Name of the Recipient");
  await viewAccountName('walletid', '1', true);

  console.log("POST Request a P2P Quotation");
  await createQuotation(buildQuotationRequestBody(), undefined, true);

  console.log('POST Perform a P2P Transfer')
  await createTransferTransaction(buildTransferTransactionRequestBody('REF-1637249499739'), undefined, true);
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
})(1);