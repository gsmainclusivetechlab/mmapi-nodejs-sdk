'use strict';

const mmapi = require('../../../lib/index');
const nock = require('nock');

describe('Accounts', function () {
  let environment = new mmapi.core.SandboxEnvironment('consumerKey', 'consumerSecret', 'apiKey', 'ENHANCED_LEVEL', 'https://e765d0c6-3d88-40d4-9fd8-ef93b154d663.mock.pstmn.io/callback');

  beforeEach(function () {
    clearToken();
    this.http = new mmapi.core.MobileMoneyApiHttpClient(environment);
    this.context = nock(environment.baseUrl);

    switch (environment.securityOption) {
      case 'DEVELOPMENT_LEVEL':
        this.securityOptionUrl = `/simulator/v1.2/passthrough/mm`;
        break;
      case 'STANDARD_LEVEL':
      case 'ENHANCED_LEVEL':
        this.securityOptionUrl = `/2/oauth/simulator/v1.2/mm`;
        break;
      default:
        this.securityOptionUrl = `/simulator/v1.2/passthrough/mm`
        break;
    }

    nock.cleanAll();
  });

  afterEach(() => nock.cleanAll());

  function mockAccessTokenRequest(context, options) {
    options = options || {};

    let accessTokenValue = options.refreshTokenResponse ? 'access-token-from-refresh-token' : 'simple-access-token';
    let times = options.times || 1;

    return context.post('/v1/oauth/accesstoken').times(times).reply(200, function (uri, requestBody) {
      const token = {
        access_token: accessTokenValue,
        expires_in: options.expiresIn || 3600,
        token_type: 'Bearer'
      };

      if (options.refreshTokenValue) {
        token.refresh_token = options.refreshTokenValue;
      }
      return token;
    }, { 'Content-Type': 'application/json' });
  }

  function clearToken() {
    const client = mmapi.core.TokenCache.cacheForEnvironment(environment);
    client.setToken(null);
  }

  function createToken(expired, refresh) {
    const token = new mmapi.core.AccessToken({
      access_token: 'simple-access-token',
      expires_in: expired ? 0 : 3600,
      token_type: 'Bearer',
    });
    token._dateCreated = Date.now() - (expired ? 360000 : 0);
    if (refresh) {
      token.refresh_token = 'refresh-token';
    }
    return token;
  }

  function authHeader(refresh) {
    return {
      reqheaders: {
        authorization: refresh ? 'Bearer access-token-from-refresh-token' : 'Bearer simple-access-token'
      }
    }
  }

  describe('ViewAccountTransactions', function () {
    const authTokenHeader = authHeader(false);
    const authRefreshHeader = authHeader(true);

    let request;

    beforeEach(async () => {
      request = new mmapi.agentService.viewAccountTransactions({ "walletid": "1" });
    })

    afterEach(async () => {
    });

    it('should return a transactions array of length 2 and indicate via response header how many transactions available in total', async function () {
      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .get(`${this.securityOptionUrl}${request.url}`)
        .reply(200, [
          { "transactionReference": "REF-1620028406917", "creditParty": [{ "key": "accountid", "value": "2000" }, { "key": "linkref", "value": "REF-1621839627337" }, { "key": "linkref", "value": "REF-1635445811066" }], "debitParty": [{ "key": "accountid", "value": "2999" }], "type": "inttransfer", "transactionStatus": "completed", "amount": "100.00", "currency": "GBP", "internationalTransferInformation": { "originCountry": "GB", "quotationReference": "{{quotationReference}}", "quoteId": "{{quoteId}}", "deliveryMethod": "agent", "receivingCountry": "RW", "relationshipSender": "none", "remittancePurpose": "personal", "sendingServiceProviderCountry": "AD" }, "senderKyc": { "nationality": "GB", "dateOfBirth": "1970-07-03", "occupation": "Manager", "employerName": "MFX", "contactPhone": "+447125588999", "gender": "m", "idDocument": [{ "idType": "nationalidcard", "idNumber": "1234567", "issueDate": "2018-07-03", "expiryDate": "2021-07-03", "issuer": "UKPA", "issuerPlace": "GB", "issuerCountry": "GB" }], "postalAddress": { "addressLine1": "111 ABC Street", "city": "New York", "stateProvince": "New York", "postalCode": "ABCD", "country": "GB" }, "subjectName": { "title": "Mr", "firstName": "Luke", "middleName": "R", "lastName": "Skywalker", "fullName": "Luke R Skywalker", "nativeName": "ABC" }, "emailAddress": "luke.skywalkeraaabbb@gmail.com", "birthCountry": "GB" }, "requestingOrganisation": { "requestingOrganisationIdentifierType": "organisationid", "requestingOrganisationIdentifier": "testorganisation" }, "creationDate": "2021-05-03T08:53:27", "modificationDate": "2021-05-03T08:53:27", "requestDate": "2021-05-03T08:53:27" }, { "transactionReference": "REF-1620133857481", "creditParty": [{ "key": "accountid", "value": "2000" }, { "key": "linkref", "value": "REF-1621839627337" }, { "key": "linkref", "value": "REF-1635445811066" }], "debitParty": [{ "key": "accountid", "value": "2999" }], "type": "inttransfer", "transactionStatus": "pending", "amount": "100.00", "currency": "GBP", "internationalTransferInformation": { "originCountry": "GB", "quotationReference": "{{quotationReference}}", "quoteId": "{{quoteId}}", "deliveryMethod": "agent", "receivingCountry": "RW", "relationshipSender": "none", "remittancePurpose": "personal", "sendingServiceProviderCountry": "AD" }, "senderKyc": { "nationality": "GB", "dateOfBirth": "1970-07-03", "occupation": "Manager", "employerName": "MFX", "contactPhone": "+447125588999", "gender": "m", "idDocument": [{ "idType": "nationalidcard", "idNumber": "1234567", "issueDate": "2018-07-03", "expiryDate": "2021-07-03", "issuer": "UKPA", "issuerPlace": "GB", "issuerCountry": "GB" }], "postalAddress": { "addressLine1": "111 ABC Street", "city": "New York", "stateProvince": "New York", "postalCode": "ABCD", "country": "GB" }, "subjectName": { "title": "Mr", "firstName": "Luke", "middleName": "R", "lastName": "Skywalker", "fullName": "Luke R Skywalker", "nativeName": "ABC" }, "emailAddress": "luke.skywalkeraaabbb@gmail.com", "birthCountry": "GB" }, "requestingOrganisation": { "requestingOrganisationIdentifierType": "organisationid", "requestingOrganisationIdentifier": "testorganisation" }, "creationDate": "2021-05-04T14:10:57", "modificationDate": "2021-05-04T14:10:57", "requestDate": "2021-05-04T14:10:57" }
        ], {
          "Content-Type": "application/json",
          'x-records-available-count': 2,
          'x-records-returned-count': 2,
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(response.status).toBe(200);
      expect(response.data.length).toBe(2);
      expect(response.headers).toHaveProperty('x-records-available-count');
      expect(response.headers).toHaveProperty('x-records-returned-count');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });

    it('should return request params with property offset if offset is invoked', async function () {
      request.offset(0);

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .get(`${this.securityOptionUrl}${request.url}`)
        .query({ offset: "0" })
        .reply(200, [
          { "transactionReference": "REF-1620028406917", "creditParty": [{ "key": "accountid", "value": "2000" }, { "key": "linkref", "value": "REF-1621839627337" }, { "key": "linkref", "value": "REF-1635445811066" }], "debitParty": [{ "key": "accountid", "value": "2999" }], "type": "inttransfer", "transactionStatus": "completed", "amount": "100.00", "currency": "GBP", "internationalTransferInformation": { "originCountry": "GB", "quotationReference": "{{quotationReference}}", "quoteId": "{{quoteId}}", "deliveryMethod": "agent", "receivingCountry": "RW", "relationshipSender": "none", "remittancePurpose": "personal", "sendingServiceProviderCountry": "AD" }, "senderKyc": { "nationality": "GB", "dateOfBirth": "1970-07-03", "occupation": "Manager", "employerName": "MFX", "contactPhone": "+447125588999", "gender": "m", "idDocument": [{ "idType": "nationalidcard", "idNumber": "1234567", "issueDate": "2018-07-03", "expiryDate": "2021-07-03", "issuer": "UKPA", "issuerPlace": "GB", "issuerCountry": "GB" }], "postalAddress": { "addressLine1": "111 ABC Street", "city": "New York", "stateProvince": "New York", "postalCode": "ABCD", "country": "GB" }, "subjectName": { "title": "Mr", "firstName": "Luke", "middleName": "R", "lastName": "Skywalker", "fullName": "Luke R Skywalker", "nativeName": "ABC" }, "emailAddress": "luke.skywalkeraaabbb@gmail.com", "birthCountry": "GB" }, "requestingOrganisation": { "requestingOrganisationIdentifierType": "organisationid", "requestingOrganisationIdentifier": "testorganisation" }, "creationDate": "2021-05-03T08:53:27", "modificationDate": "2021-05-03T08:53:27", "requestDate": "2021-05-03T08:53:27" }, { "transactionReference": "REF-1620133857481", "creditParty": [{ "key": "accountid", "value": "2000" }, { "key": "linkref", "value": "REF-1621839627337" }, { "key": "linkref", "value": "REF-1635445811066" }], "debitParty": [{ "key": "accountid", "value": "2999" }], "type": "inttransfer", "transactionStatus": "pending", "amount": "100.00", "currency": "GBP", "internationalTransferInformation": { "originCountry": "GB", "quotationReference": "{{quotationReference}}", "quoteId": "{{quoteId}}", "deliveryMethod": "agent", "receivingCountry": "RW", "relationshipSender": "none", "remittancePurpose": "personal", "sendingServiceProviderCountry": "AD" }, "senderKyc": { "nationality": "GB", "dateOfBirth": "1970-07-03", "occupation": "Manager", "employerName": "MFX", "contactPhone": "+447125588999", "gender": "m", "idDocument": [{ "idType": "nationalidcard", "idNumber": "1234567", "issueDate": "2018-07-03", "expiryDate": "2021-07-03", "issuer": "UKPA", "issuerPlace": "GB", "issuerCountry": "GB" }], "postalAddress": { "addressLine1": "111 ABC Street", "city": "New York", "stateProvince": "New York", "postalCode": "ABCD", "country": "GB" }, "subjectName": { "title": "Mr", "firstName": "Luke", "middleName": "R", "lastName": "Skywalker", "fullName": "Luke R Skywalker", "nativeName": "ABC" }, "emailAddress": "luke.skywalkeraaabbb@gmail.com", "birthCountry": "GB" }, "requestingOrganisation": { "requestingOrganisationIdentifierType": "organisationid", "requestingOrganisationIdentifier": "testorganisation" }, "creationDate": "2021-05-04T14:10:57", "modificationDate": "2021-05-04T14:10:57", "requestDate": "2021-05-04T14:10:57" }
        ], {
          "Content-Type": "application/json",
          'x-records-available-count': 2,
          'x-records-returned-count': 2,
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(request.params).toHaveProperty('offset');
      expect(response.data.length).toBe(2);
      expect(response.headers).toHaveProperty('x-records-available-count');
      expect(response.headers).toHaveProperty('x-records-returned-count');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });

    it('should return request params with property limit if limit is invoked', async function () {
      request.limit(2);

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .get(`${this.securityOptionUrl}${request.url}`)
        .query({ limit: "2" })
        .reply(200, [
          { "transactionReference": "REF-1620028406917", "creditParty": [{ "key": "accountid", "value": "2000" }, { "key": "linkref", "value": "REF-1621839627337" }, { "key": "linkref", "value": "REF-1635445811066" }], "debitParty": [{ "key": "accountid", "value": "2999" }], "type": "inttransfer", "transactionStatus": "completed", "amount": "100.00", "currency": "GBP", "internationalTransferInformation": { "originCountry": "GB", "quotationReference": "{{quotationReference}}", "quoteId": "{{quoteId}}", "deliveryMethod": "agent", "receivingCountry": "RW", "relationshipSender": "none", "remittancePurpose": "personal", "sendingServiceProviderCountry": "AD" }, "senderKyc": { "nationality": "GB", "dateOfBirth": "1970-07-03", "occupation": "Manager", "employerName": "MFX", "contactPhone": "+447125588999", "gender": "m", "idDocument": [{ "idType": "nationalidcard", "idNumber": "1234567", "issueDate": "2018-07-03", "expiryDate": "2021-07-03", "issuer": "UKPA", "issuerPlace": "GB", "issuerCountry": "GB" }], "postalAddress": { "addressLine1": "111 ABC Street", "city": "New York", "stateProvince": "New York", "postalCode": "ABCD", "country": "GB" }, "subjectName": { "title": "Mr", "firstName": "Luke", "middleName": "R", "lastName": "Skywalker", "fullName": "Luke R Skywalker", "nativeName": "ABC" }, "emailAddress": "luke.skywalkeraaabbb@gmail.com", "birthCountry": "GB" }, "requestingOrganisation": { "requestingOrganisationIdentifierType": "organisationid", "requestingOrganisationIdentifier": "testorganisation" }, "creationDate": "2021-05-03T08:53:27", "modificationDate": "2021-05-03T08:53:27", "requestDate": "2021-05-03T08:53:27" }, { "transactionReference": "REF-1620133857481", "creditParty": [{ "key": "accountid", "value": "2000" }, { "key": "linkref", "value": "REF-1621839627337" }, { "key": "linkref", "value": "REF-1635445811066" }], "debitParty": [{ "key": "accountid", "value": "2999" }], "type": "inttransfer", "transactionStatus": "pending", "amount": "100.00", "currency": "GBP", "internationalTransferInformation": { "originCountry": "GB", "quotationReference": "{{quotationReference}}", "quoteId": "{{quoteId}}", "deliveryMethod": "agent", "receivingCountry": "RW", "relationshipSender": "none", "remittancePurpose": "personal", "sendingServiceProviderCountry": "AD" }, "senderKyc": { "nationality": "GB", "dateOfBirth": "1970-07-03", "occupation": "Manager", "employerName": "MFX", "contactPhone": "+447125588999", "gender": "m", "idDocument": [{ "idType": "nationalidcard", "idNumber": "1234567", "issueDate": "2018-07-03", "expiryDate": "2021-07-03", "issuer": "UKPA", "issuerPlace": "GB", "issuerCountry": "GB" }], "postalAddress": { "addressLine1": "111 ABC Street", "city": "New York", "stateProvince": "New York", "postalCode": "ABCD", "country": "GB" }, "subjectName": { "title": "Mr", "firstName": "Luke", "middleName": "R", "lastName": "Skywalker", "fullName": "Luke R Skywalker", "nativeName": "ABC" }, "emailAddress": "luke.skywalkeraaabbb@gmail.com", "birthCountry": "GB" }, "requestingOrganisation": { "requestingOrganisationIdentifierType": "organisationid", "requestingOrganisationIdentifier": "testorganisation" }, "creationDate": "2021-05-04T14:10:57", "modificationDate": "2021-05-04T14:10:57", "requestDate": "2021-05-04T14:10:57" }
        ], {
          "Content-Type": "application/json",
          'x-records-available-count': 2,
          'x-records-returned-count': 2,
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(request.params).toHaveProperty('limit');
      expect(response.data.length).toBe(2);
      expect(response.headers).toHaveProperty('x-records-available-count');
      expect(response.headers).toHaveProperty('x-records-returned-count');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });

    it('should return request params with property fromDateTime if fromDateTime is invoked', async function () {
      request.fromDateTime("2022-01-01T00:00:00");

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .get(`${this.securityOptionUrl}${request.url}`)
        .query({ fromDateTime: "2022-01-01T00:00:00" })
        .reply(200, [
          { "transactionReference": "REF-1620028406917", "creditParty": [{ "key": "accountid", "value": "2000" }, { "key": "linkref", "value": "REF-1621839627337" }, { "key": "linkref", "value": "REF-1635445811066" }], "debitParty": [{ "key": "accountid", "value": "2999" }], "type": "inttransfer", "transactionStatus": "completed", "amount": "100.00", "currency": "GBP", "internationalTransferInformation": { "originCountry": "GB", "quotationReference": "{{quotationReference}}", "quoteId": "{{quoteId}}", "deliveryMethod": "agent", "receivingCountry": "RW", "relationshipSender": "none", "remittancePurpose": "personal", "sendingServiceProviderCountry": "AD" }, "senderKyc": { "nationality": "GB", "dateOfBirth": "1970-07-03", "occupation": "Manager", "employerName": "MFX", "contactPhone": "+447125588999", "gender": "m", "idDocument": [{ "idType": "nationalidcard", "idNumber": "1234567", "issueDate": "2018-07-03", "expiryDate": "2021-07-03", "issuer": "UKPA", "issuerPlace": "GB", "issuerCountry": "GB" }], "postalAddress": { "addressLine1": "111 ABC Street", "city": "New York", "stateProvince": "New York", "postalCode": "ABCD", "country": "GB" }, "subjectName": { "title": "Mr", "firstName": "Luke", "middleName": "R", "lastName": "Skywalker", "fullName": "Luke R Skywalker", "nativeName": "ABC" }, "emailAddress": "luke.skywalkeraaabbb@gmail.com", "birthCountry": "GB" }, "requestingOrganisation": { "requestingOrganisationIdentifierType": "organisationid", "requestingOrganisationIdentifier": "testorganisation" }, "creationDate": "2021-05-03T08:53:27", "modificationDate": "2021-05-03T08:53:27", "requestDate": "2021-05-03T08:53:27" }, { "transactionReference": "REF-1620133857481", "creditParty": [{ "key": "accountid", "value": "2000" }, { "key": "linkref", "value": "REF-1621839627337" }, { "key": "linkref", "value": "REF-1635445811066" }], "debitParty": [{ "key": "accountid", "value": "2999" }], "type": "inttransfer", "transactionStatus": "pending", "amount": "100.00", "currency": "GBP", "internationalTransferInformation": { "originCountry": "GB", "quotationReference": "{{quotationReference}}", "quoteId": "{{quoteId}}", "deliveryMethod": "agent", "receivingCountry": "RW", "relationshipSender": "none", "remittancePurpose": "personal", "sendingServiceProviderCountry": "AD" }, "senderKyc": { "nationality": "GB", "dateOfBirth": "1970-07-03", "occupation": "Manager", "employerName": "MFX", "contactPhone": "+447125588999", "gender": "m", "idDocument": [{ "idType": "nationalidcard", "idNumber": "1234567", "issueDate": "2018-07-03", "expiryDate": "2021-07-03", "issuer": "UKPA", "issuerPlace": "GB", "issuerCountry": "GB" }], "postalAddress": { "addressLine1": "111 ABC Street", "city": "New York", "stateProvince": "New York", "postalCode": "ABCD", "country": "GB" }, "subjectName": { "title": "Mr", "firstName": "Luke", "middleName": "R", "lastName": "Skywalker", "fullName": "Luke R Skywalker", "nativeName": "ABC" }, "emailAddress": "luke.skywalkeraaabbb@gmail.com", "birthCountry": "GB" }, "requestingOrganisation": { "requestingOrganisationIdentifierType": "organisationid", "requestingOrganisationIdentifier": "testorganisation" }, "creationDate": "2021-05-04T14:10:57", "modificationDate": "2021-05-04T14:10:57", "requestDate": "2021-05-04T14:10:57" }
        ], {
          "Content-Type": "application/json",
          'x-records-available-count': 2,
          'x-records-returned-count': 2,
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(request.params).toHaveProperty('fromDateTime');
      expect(response.data.length).toBe(2);
      expect(response.headers).toHaveProperty('x-records-available-count');
      expect(response.headers).toHaveProperty('x-records-returned-count');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });

    it('should return request params with property toDateTime if toDateTime is invoked', async function () {
      request.toDateTime("2022-01-01T00:00:00");

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .get(`${this.securityOptionUrl}${request.url}`)
        .query({ toDateTime: "2022-01-01T00:00:00" })
        .reply(200, [
          { "transactionReference": "REF-1620028406917", "creditParty": [{ "key": "accountid", "value": "2000" }, { "key": "linkref", "value": "REF-1621839627337" }, { "key": "linkref", "value": "REF-1635445811066" }], "debitParty": [{ "key": "accountid", "value": "2999" }], "type": "inttransfer", "transactionStatus": "completed", "amount": "100.00", "currency": "GBP", "internationalTransferInformation": { "originCountry": "GB", "quotationReference": "{{quotationReference}}", "quoteId": "{{quoteId}}", "deliveryMethod": "agent", "receivingCountry": "RW", "relationshipSender": "none", "remittancePurpose": "personal", "sendingServiceProviderCountry": "AD" }, "senderKyc": { "nationality": "GB", "dateOfBirth": "1970-07-03", "occupation": "Manager", "employerName": "MFX", "contactPhone": "+447125588999", "gender": "m", "idDocument": [{ "idType": "nationalidcard", "idNumber": "1234567", "issueDate": "2018-07-03", "expiryDate": "2021-07-03", "issuer": "UKPA", "issuerPlace": "GB", "issuerCountry": "GB" }], "postalAddress": { "addressLine1": "111 ABC Street", "city": "New York", "stateProvince": "New York", "postalCode": "ABCD", "country": "GB" }, "subjectName": { "title": "Mr", "firstName": "Luke", "middleName": "R", "lastName": "Skywalker", "fullName": "Luke R Skywalker", "nativeName": "ABC" }, "emailAddress": "luke.skywalkeraaabbb@gmail.com", "birthCountry": "GB" }, "requestingOrganisation": { "requestingOrganisationIdentifierType": "organisationid", "requestingOrganisationIdentifier": "testorganisation" }, "creationDate": "2021-05-03T08:53:27", "modificationDate": "2021-05-03T08:53:27", "requestDate": "2021-05-03T08:53:27" }, { "transactionReference": "REF-1620133857481", "creditParty": [{ "key": "accountid", "value": "2000" }, { "key": "linkref", "value": "REF-1621839627337" }, { "key": "linkref", "value": "REF-1635445811066" }], "debitParty": [{ "key": "accountid", "value": "2999" }], "type": "inttransfer", "transactionStatus": "pending", "amount": "100.00", "currency": "GBP", "internationalTransferInformation": { "originCountry": "GB", "quotationReference": "{{quotationReference}}", "quoteId": "{{quoteId}}", "deliveryMethod": "agent", "receivingCountry": "RW", "relationshipSender": "none", "remittancePurpose": "personal", "sendingServiceProviderCountry": "AD" }, "senderKyc": { "nationality": "GB", "dateOfBirth": "1970-07-03", "occupation": "Manager", "employerName": "MFX", "contactPhone": "+447125588999", "gender": "m", "idDocument": [{ "idType": "nationalidcard", "idNumber": "1234567", "issueDate": "2018-07-03", "expiryDate": "2021-07-03", "issuer": "UKPA", "issuerPlace": "GB", "issuerCountry": "GB" }], "postalAddress": { "addressLine1": "111 ABC Street", "city": "New York", "stateProvince": "New York", "postalCode": "ABCD", "country": "GB" }, "subjectName": { "title": "Mr", "firstName": "Luke", "middleName": "R", "lastName": "Skywalker", "fullName": "Luke R Skywalker", "nativeName": "ABC" }, "emailAddress": "luke.skywalkeraaabbb@gmail.com", "birthCountry": "GB" }, "requestingOrganisation": { "requestingOrganisationIdentifierType": "organisationid", "requestingOrganisationIdentifier": "testorganisation" }, "creationDate": "2021-05-04T14:10:57", "modificationDate": "2021-05-04T14:10:57", "requestDate": "2021-05-04T14:10:57" }
        ], {
          "Content-Type": "application/json",
          'x-records-available-count': 2,
          'x-records-returned-count': 2,
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(request.params).toHaveProperty('toDateTime');
      expect(response.data.length).toBe(2);
      expect(response.headers).toHaveProperty('x-records-available-count');
      expect(response.headers).toHaveProperty('x-records-returned-count');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });

    it('should return request params with property transactionStatus if transactionStatus is invoked', async function () {
      request.transactionStatus("completed");

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .get(`${this.securityOptionUrl}${request.url}`)
        .query({ transactionStatus: "completed" })
        .reply(200, [
          { "transactionReference": "REF-1620028406917", "creditParty": [{ "key": "accountid", "value": "2000" }, { "key": "linkref", "value": "REF-1621839627337" }, { "key": "linkref", "value": "REF-1635445811066" }], "debitParty": [{ "key": "accountid", "value": "2999" }], "type": "inttransfer", "transactionStatus": "completed", "amount": "100.00", "currency": "GBP", "internationalTransferInformation": { "originCountry": "GB", "quotationReference": "{{quotationReference}}", "quoteId": "{{quoteId}}", "deliveryMethod": "agent", "receivingCountry": "RW", "relationshipSender": "none", "remittancePurpose": "personal", "sendingServiceProviderCountry": "AD" }, "senderKyc": { "nationality": "GB", "dateOfBirth": "1970-07-03", "occupation": "Manager", "employerName": "MFX", "contactPhone": "+447125588999", "gender": "m", "idDocument": [{ "idType": "nationalidcard", "idNumber": "1234567", "issueDate": "2018-07-03", "expiryDate": "2021-07-03", "issuer": "UKPA", "issuerPlace": "GB", "issuerCountry": "GB" }], "postalAddress": { "addressLine1": "111 ABC Street", "city": "New York", "stateProvince": "New York", "postalCode": "ABCD", "country": "GB" }, "subjectName": { "title": "Mr", "firstName": "Luke", "middleName": "R", "lastName": "Skywalker", "fullName": "Luke R Skywalker", "nativeName": "ABC" }, "emailAddress": "luke.skywalkeraaabbb@gmail.com", "birthCountry": "GB" }, "requestingOrganisation": { "requestingOrganisationIdentifierType": "organisationid", "requestingOrganisationIdentifier": "testorganisation" }, "creationDate": "2021-05-03T08:53:27", "modificationDate": "2021-05-03T08:53:27", "requestDate": "2021-05-03T08:53:27" }, { "transactionReference": "REF-1620133857481", "creditParty": [{ "key": "accountid", "value": "2000" }, { "key": "linkref", "value": "REF-1621839627337" }, { "key": "linkref", "value": "REF-1635445811066" }], "debitParty": [{ "key": "accountid", "value": "2999" }], "type": "inttransfer", "transactionStatus": "pending", "amount": "100.00", "currency": "GBP", "internationalTransferInformation": { "originCountry": "GB", "quotationReference": "{{quotationReference}}", "quoteId": "{{quoteId}}", "deliveryMethod": "agent", "receivingCountry": "RW", "relationshipSender": "none", "remittancePurpose": "personal", "sendingServiceProviderCountry": "AD" }, "senderKyc": { "nationality": "GB", "dateOfBirth": "1970-07-03", "occupation": "Manager", "employerName": "MFX", "contactPhone": "+447125588999", "gender": "m", "idDocument": [{ "idType": "nationalidcard", "idNumber": "1234567", "issueDate": "2018-07-03", "expiryDate": "2021-07-03", "issuer": "UKPA", "issuerPlace": "GB", "issuerCountry": "GB" }], "postalAddress": { "addressLine1": "111 ABC Street", "city": "New York", "stateProvince": "New York", "postalCode": "ABCD", "country": "GB" }, "subjectName": { "title": "Mr", "firstName": "Luke", "middleName": "R", "lastName": "Skywalker", "fullName": "Luke R Skywalker", "nativeName": "ABC" }, "emailAddress": "luke.skywalkeraaabbb@gmail.com", "birthCountry": "GB" }, "requestingOrganisation": { "requestingOrganisationIdentifierType": "organisationid", "requestingOrganisationIdentifier": "testorganisation" }, "creationDate": "2021-05-04T14:10:57", "modificationDate": "2021-05-04T14:10:57", "requestDate": "2021-05-04T14:10:57" }
        ], {
          "Content-Type": "application/json",
          'x-records-available-count': 2,
          'x-records-returned-count': 2,
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(request.params).toHaveProperty('transactionStatus');
      expect(response.data.length).toBe(2);
      expect(response.headers).toHaveProperty('x-records-available-count');
      expect(response.headers).toHaveProperty('x-records-returned-count');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });

    it('should return request params with property transactionType if transactionType is invoked', async function () {
      request.transactionType("deposit");

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .get(`${this.securityOptionUrl}${request.url}`)
        .query({ transactionType: "deposit" })
        .reply(200, [
          { "transactionReference": "REF-1620028406917", "creditParty": [{ "key": "accountid", "value": "2000" }, { "key": "linkref", "value": "REF-1621839627337" }, { "key": "linkref", "value": "REF-1635445811066" }], "debitParty": [{ "key": "accountid", "value": "2999" }], "type": "inttransfer", "transactionStatus": "completed", "amount": "100.00", "currency": "GBP", "internationalTransferInformation": { "originCountry": "GB", "quotationReference": "{{quotationReference}}", "quoteId": "{{quoteId}}", "deliveryMethod": "agent", "receivingCountry": "RW", "relationshipSender": "none", "remittancePurpose": "personal", "sendingServiceProviderCountry": "AD" }, "senderKyc": { "nationality": "GB", "dateOfBirth": "1970-07-03", "occupation": "Manager", "employerName": "MFX", "contactPhone": "+447125588999", "gender": "m", "idDocument": [{ "idType": "nationalidcard", "idNumber": "1234567", "issueDate": "2018-07-03", "expiryDate": "2021-07-03", "issuer": "UKPA", "issuerPlace": "GB", "issuerCountry": "GB" }], "postalAddress": { "addressLine1": "111 ABC Street", "city": "New York", "stateProvince": "New York", "postalCode": "ABCD", "country": "GB" }, "subjectName": { "title": "Mr", "firstName": "Luke", "middleName": "R", "lastName": "Skywalker", "fullName": "Luke R Skywalker", "nativeName": "ABC" }, "emailAddress": "luke.skywalkeraaabbb@gmail.com", "birthCountry": "GB" }, "requestingOrganisation": { "requestingOrganisationIdentifierType": "organisationid", "requestingOrganisationIdentifier": "testorganisation" }, "creationDate": "2021-05-03T08:53:27", "modificationDate": "2021-05-03T08:53:27", "requestDate": "2021-05-03T08:53:27" }, { "transactionReference": "REF-1620133857481", "creditParty": [{ "key": "accountid", "value": "2000" }, { "key": "linkref", "value": "REF-1621839627337" }, { "key": "linkref", "value": "REF-1635445811066" }], "debitParty": [{ "key": "accountid", "value": "2999" }], "type": "inttransfer", "transactionStatus": "pending", "amount": "100.00", "currency": "GBP", "internationalTransferInformation": { "originCountry": "GB", "quotationReference": "{{quotationReference}}", "quoteId": "{{quoteId}}", "deliveryMethod": "agent", "receivingCountry": "RW", "relationshipSender": "none", "remittancePurpose": "personal", "sendingServiceProviderCountry": "AD" }, "senderKyc": { "nationality": "GB", "dateOfBirth": "1970-07-03", "occupation": "Manager", "employerName": "MFX", "contactPhone": "+447125588999", "gender": "m", "idDocument": [{ "idType": "nationalidcard", "idNumber": "1234567", "issueDate": "2018-07-03", "expiryDate": "2021-07-03", "issuer": "UKPA", "issuerPlace": "GB", "issuerCountry": "GB" }], "postalAddress": { "addressLine1": "111 ABC Street", "city": "New York", "stateProvince": "New York", "postalCode": "ABCD", "country": "GB" }, "subjectName": { "title": "Mr", "firstName": "Luke", "middleName": "R", "lastName": "Skywalker", "fullName": "Luke R Skywalker", "nativeName": "ABC" }, "emailAddress": "luke.skywalkeraaabbb@gmail.com", "birthCountry": "GB" }, "requestingOrganisation": { "requestingOrganisationIdentifierType": "organisationid", "requestingOrganisationIdentifier": "testorganisation" }, "creationDate": "2021-05-04T14:10:57", "modificationDate": "2021-05-04T14:10:57", "requestDate": "2021-05-04T14:10:57" }
        ], {
          "Content-Type": "application/json",
          'x-records-available-count': 2,
          'x-records-returned-count': 2,
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(request.params).toHaveProperty('transactionType');
      expect(response.data.length).toBe(2);
      expect(response.headers).toHaveProperty('x-records-available-count');
      expect(response.headers).toHaveProperty('x-records-returned-count');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });
  })
});