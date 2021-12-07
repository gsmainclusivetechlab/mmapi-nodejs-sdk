const {
  viewAccountBalance,
  viewServiceAvailability,
  viewResponse,
  viewResource,
  createQuotation,
  createInternationalTransaction,
  createReversal,
  viewAccountTransactions,
  viewQuotation,
  viewRequestState,
  viewTransaction
} = require('../samples/index')

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
  "type": "inttransfer",
  "subType": "abc",
  "chosenDeliveryMethod": "agent",
  "senderKyc": {
    "nationality": "GB",
    "dateOfBirth": "1970-07-03T11:43:27.405Z",
    "occupation": "Manager",
    "employerName": "MFX",
    "contactPhone": "+447125588999",
    "gender": "m",
    "emailAddress": "luke.skywalkeraaabbb@gmail.com",
    "birthCountry": "GB",
    "idDocument": [
      {
        "idType": "nationalidcard",
        "idNumber": "1234567",
        "issueDate": "2018-07-03T11:43:27.405Z",
        "expiryDate": "2021-07-03T11:43:27.405Z",
        "issuer": "UKPA",
        "issuerPlace": "GB",
        "issuerCountry": "GB",
        "otherIdDescription": "test"
      }
    ],
    "postalAddress": {
      "country": "GB",
      "addressLine1": "111 ABC Street",
      "city": "New York",
      "stateProvince": "New York",
      "postalCode": "ABCD"
    },
    "subjectName": {
      "title": "Mr",
      "firstName": "Luke",
      "middleName": "R",
      "lastName": "Skywalker",
      "fullName": "Luke R Skywalker",
      "nativeName": "ABC"
    }
  },
  "customData": [
    {
      "key": "keytest",
      "value": "keyvalue"
    }
  ],
  "sendingServiceProviderCountry": "AD",
  "originCountry": "AD",
  "receivingCountry": "AD"
})

const usecase1 = async () => {
  console.log("Perform an International Transfer...");

  console.log("POST Request a International Transfer Quotation")
  await createQuotation(buildQuotationRequestBody(), 'internationalTransfer', undefined, true);

  console.log("POST Perform an International Transfer")
  await createInternationalTransaction('REF-1636533162268', undefined, 'internationalTransfer', undefined, true);
}

const usecase2 = async () => {
  console.log("Perform an Bilateral International Transfer...");

  console.log("POST Request a International Transfer Quotation")
  await createQuotation(buildQuotationRequestBody(), 'internationalTransfer', undefined, true);

  console.log("POST Perform an International Transfer")
  await createInternationalTransaction('REF-1636533162268', undefined, 'internationalTransfer', undefined, true);
}

const usecase3 = async () => {
  console.log("Perform an International Transfer via the Polling Method...");

  console.log("POST Perform an International Transfer")
  let { data: { serverCorrelationId } } = await createInternationalTransaction('REF-1636533162268', undefined, 'internationalTransfer', true, true);

  console.log('GET Poll to Determine the Request State')
  const { data: { objectReference } } = await viewRequestState(serverCorrelationId, 'internationalTransfer', true);

  console.log('GET Retrieve a Transaction')
  await viewTransaction(objectReference, 'internationalTransfer', true)
}

const usecase4 = async () => {
  console.log("Request a International Transfer Quotation via the Polling Method...");

  console.log("POST Request a International Transfer Quotation")
  let { data: { serverCorrelationId, pollLimit } } = await createQuotation(buildQuotationRequestBody(), 'internationalTransfer', true, true);

  pollLimit = 3

  for (let [index] of [...Array(pollLimit)].entries()) {
    console.log('GET Poll to Determine the Request State', index)
    const { data: { objectReference, status } } = await viewRequestState(serverCorrelationId, 'internationalTransfer', true);

    if (status === 'completed') {
      console.log('GET View A Quotation')
      await viewQuotation(objectReference, 'internationalTransfer', true);

      break;
    }
  }
}

const usecase5 = async () => {
  console.log("Perform a International Transfer Reversal...");

  console.log("POST Perform an International Transfer")
  const { data: { serverCorrelationId } } = await createInternationalTransaction('REF-1636533162268', undefined, 'internationalTransfer', undefined, true);

  console.log('GET Poll to Determine the Request State')
  const { data: { objectReference } } = await viewRequestState(serverCorrelationId, 'internationalTransfer', true);

  console.log('GET Perform a Merchant Payment Reversal')
  await createReversal({}, objectReference, 'internationalTransfer', true);
}

const usecase6 = async () => {
  console.log("Obtain a Financial Service Provider Balance...");

  console.log('GET Get an Account Balance')
  await viewAccountBalance('accountid', '2000', 'internationalTransfer', true);
}

const usecase7 = async () => {
  console.log("Retrieve Transactions for a Financial Service Provider...");

  console.log('GET Retrieve a Set of Transactions for an Account')
  await viewAccountTransactions('accountid', '2000', 0, 2, 'internationalTransfer', true);
}

const usecase8 = async () => {
  console.log("Check for API Provider Service Availability...")

  console.log('GET Check for Service Availability')
  await viewServiceAvailability('internationalTransfer', true);
}

const usecase9 = async () => {
  console.log("Retrieve a Missing API Response from an API Provider...")

  console.log('POST Perform an International Transfer');
  const { config: { headers } } = await createInternationalTransaction('REF-1636533162268', undefined, 'internationalTransfer', undefined, true);

  console.log('GET Retrieve a Missing Response');
  const { data: { link } } = await viewResponse(headers['X-CorrelationID'], 'internationalTransfer', true);

  console.log('GET Retrieve a Missing Resource');
  await viewResource(link, 'internationalTransfer', true);
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
    case 4:
      await usecase4();
      break;
    case 5:
      await usecase5();
      break;
    case 6:
      await usecase6();
      break;
    case 7:
      await usecase7();
      break;
    case 8:
      await usecase8();
      break;
    case 9:
      await usecase9();
      break;
    default:
      await usecase1();
      await usecase2();
      await usecase3();
      await usecase4();
      await usecase5();
      await usecase6();
      await usecase7();
      await usecase8();
      await usecase9();
      break;
  }
})();
