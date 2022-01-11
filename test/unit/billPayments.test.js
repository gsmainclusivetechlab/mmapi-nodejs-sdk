'use strict';

const mmapi = require('../../lib/index');
const nock = require('nock');

describe('Bill Payments', function () {
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

  describe('createBillPayment', function () {
    const authTokenHeader = authHeader(false);
    const authRefreshHeader = authHeader(true);

    let request;

    beforeEach(async () => {
      request = new mmapi.billPayment.createBillPayment({ 'accountid': '1' });

      request.body({
        "currency": "GBP",
        "amountPaid": "5.30"
      })
    });

    afterEach(async () => {
    });

    it('should return the notification method polling by default', async function () {
      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .post(`${this.securityOptionUrl}${request.url}`, request.data)
        .reply(202, {
          "serverCorrelationId": "e4ec6346-65e0-4761-8c91-51a06f423008", "status": "pending", "notificationMethod": "polling", "objectReference": "1227", "pollLimit": 100
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(response.status).toBe(202);
      expect(response.data).toHaveProperty('status');
      expect(response.data.status).toBe('pending');
      expect(response.data).toHaveProperty('serverCorrelationId');
      expect(response.data).toHaveProperty('notificationMethod');
      expect(response.data.notificationMethod).toBe('polling');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });

    it('should return notification method callback if callback is invoked', async function () {
      request.callback('https://test.com/callback');

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .post(`${this.securityOptionUrl}${request.url}`, request.data)
        .reply(202, {
          "serverCorrelationId": "e4ec6346-65e0-4761-8c91-51a06f423008", "status": "pending", "notificationMethod": "callback", "objectReference": "1227", "pollLimit": 100
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(response.status).toBe(202);
      expect(response.data).toHaveProperty('status');
      expect(response.data.status).toBe('pending');
      expect(response.data).toHaveProperty('serverCorrelationId');
      expect(response.data).toHaveProperty('notificationMethod');
      expect(response.data.notificationMethod).toBe('callback');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });

    it('should return notification method polling if polling is invoked', async function () {
      request.polling();

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .post(`${this.securityOptionUrl}${request.url}`, request.data)
        .reply(202, {
          "serverCorrelationId": "e4ec6346-65e0-4761-8c91-51a06f423008", "status": "pending", "notificationMethod": "polling", "objectReference": "1227", "pollLimit": 100
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(response.status).toBe(202);
      expect(response.data).toHaveProperty('status');
      expect(response.data.status).toBe('pending');
      expect(response.data).toHaveProperty('serverCorrelationId');
      expect(response.data).toHaveProperty('notificationMethod');
      expect(response.data.notificationMethod).toBe('polling');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });

    it('should return request data with property currency if currency is invoked', async function () {
      request.currency("GBP");

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .post(`${this.securityOptionUrl}${request.url}`, request.data)
        .reply(202, {
          "serverCorrelationId": "e4ec6346-65e0-4761-8c91-51a06f423008", "status": "pending", "notificationMethod": "polling", "objectReference": "1227", "pollLimit": 100
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(request.data).toHaveProperty('currency');
      expect(response.status).toBe(202);
      expect(response.data).toHaveProperty('status');
      expect(response.data.status).toBe('pending');
      expect(response.data).toHaveProperty('serverCorrelationId');
      expect(response.data).toHaveProperty('notificationMethod');
      expect(response.data.notificationMethod).toBe('polling');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });

    it('should return request data with property amountPaid if amountPaid is invoked', async function () {
      request.amountPaid("5.30");

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .post(`${this.securityOptionUrl}${request.url}`, request.data)
        .reply(202, {
          "serverCorrelationId": "e4ec6346-65e0-4761-8c91-51a06f423008", "status": "pending", "notificationMethod": "polling", "objectReference": "1227", "pollLimit": 100
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(request.data).toHaveProperty('amountPaid');
      expect(response.status).toBe(202);
      expect(response.data).toHaveProperty('status');
      expect(response.data.status).toBe('pending');
      expect(response.data).toHaveProperty('serverCorrelationId');
      expect(response.data).toHaveProperty('notificationMethod');
      expect(response.data.notificationMethod).toBe('polling');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });

    it('should return request data with property serviceProviderPaymentReference if serviceProviderPaymentReference is invoked', async function () {
      request.serviceProviderPaymentReference("example-service-provider-payment-reference");

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .post(`${this.securityOptionUrl}${request.url}`, request.data)
        .reply(202, {
          "serverCorrelationId": "e4ec6346-65e0-4761-8c91-51a06f423008", "status": "pending", "notificationMethod": "polling", "objectReference": "1227", "pollLimit": 100
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(request.data).toHaveProperty('serviceProviderPaymentReference');
      expect(response.status).toBe(202);
      expect(response.data).toHaveProperty('status');
      expect(response.data.status).toBe('pending');
      expect(response.data).toHaveProperty('serverCorrelationId');
      expect(response.data).toHaveProperty('notificationMethod');
      expect(response.data.notificationMethod).toBe('polling');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });

    it('should return request data with property requestingOrganisationTransactionReference if requestingOrganisationTransactionReference is invoked', async function () {
      request.requestingOrganisationTransactionReference("example-requestingOrganisationTransactionReference");

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .post(`${this.securityOptionUrl}${request.url}`, request.data)
        .reply(202, {
          "serverCorrelationId": "e4ec6346-65e0-4761-8c91-51a06f423008", "status": "pending", "notificationMethod": "polling", "objectReference": "1227", "pollLimit": 100
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(request.data).toHaveProperty('requestingOrganisationTransactionReference');
      expect(response.status).toBe(202);
      expect(response.data).toHaveProperty('status');
      expect(response.data.status).toBe('pending');
      expect(response.data).toHaveProperty('serverCorrelationId');
      expect(response.data).toHaveProperty('notificationMethod');
      expect(response.data.notificationMethod).toBe('polling');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });

    it('should return request data with property paymentType if paymentType is invoked', async function () {
      request.paymentType("fullpayment");

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .post(`${this.securityOptionUrl}${request.url}`, request.data)
        .reply(202, {
          "serverCorrelationId": "e4ec6346-65e0-4761-8c91-51a06f423008", "status": "pending", "notificationMethod": "polling", "objectReference": "1227", "pollLimit": 100
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(request.data).toHaveProperty('paymentType');
      expect(response.status).toBe(202);
      expect(response.data).toHaveProperty('status');
      expect(response.data.status).toBe('pending');
      expect(response.data).toHaveProperty('serverCorrelationId');
      expect(response.data).toHaveProperty('notificationMethod');
      expect(response.data.notificationMethod).toBe('polling');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });

    it('should return request data with property customerReference if customerReference is invoked', async function () {
      request.customerReference("example-customerReference");

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .post(`${this.securityOptionUrl}${request.url}`, request.data)
        .reply(202, {
          "serverCorrelationId": "e4ec6346-65e0-4761-8c91-51a06f423008", "status": "pending", "notificationMethod": "polling", "objectReference": "1227", "pollLimit": 100
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(request.data).toHaveProperty('customerReference');
      expect(response.status).toBe(202);
      expect(response.data).toHaveProperty('status');
      expect(response.data.status).toBe('pending');
      expect(response.data).toHaveProperty('serverCorrelationId');
      expect(response.data).toHaveProperty('notificationMethod');
      expect(response.data.notificationMethod).toBe('polling');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });

    it('should return request data with property requestingOrganisation if requestingOrganisation is invoked', async function () {
      request.requestingOrganisation({
        "requestingOrganisationIdentifierType": "organisationid",
        "requestingOrganisationIdentifier": "12345"
      });

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .post(`${this.securityOptionUrl}${request.url}`, request.data)
        .reply(202, {
          "serverCorrelationId": "e4ec6346-65e0-4761-8c91-51a06f423008", "status": "pending", "notificationMethod": "polling", "objectReference": "1227", "pollLimit": 100
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(request.data).toHaveProperty('requestingOrganisation');
      expect(response.status).toBe(202);
      expect(response.data).toHaveProperty('status');
      expect(response.data.status).toBe('pending');
      expect(response.data).toHaveProperty('serverCorrelationId');
      expect(response.data).toHaveProperty('notificationMethod');
      expect(response.data.notificationMethod).toBe('polling');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });

    it('should return request data with property supplementaryBillReferenceDetails if supplementaryBillReferenceDetails is invoked', async function () {
      request.supplementaryBillReferenceDetails([{ "paymentReferenceType": "value", "paymentReferenceValue": "value" }]);

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .post(`${this.securityOptionUrl}${request.url}`, request.data)
        .reply(202, {
          "serverCorrelationId": "e4ec6346-65e0-4761-8c91-51a06f423008", "status": "pending", "notificationMethod": "polling", "objectReference": "1227", "pollLimit": 100
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(request.data).toHaveProperty('supplementaryBillReferenceDetails');
      expect(response.status).toBe(202);
      expect(response.data).toHaveProperty('status');
      expect(response.data.status).toBe('pending');
      expect(response.data).toHaveProperty('serverCorrelationId');
      expect(response.data).toHaveProperty('notificationMethod');
      expect(response.data.notificationMethod).toBe('polling');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });

    it('should return request data with property requestDate if requestDate is invoked', async function () {
      request.requestDate("2018-07-03T10:43:27.405Z");

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .post(`${this.securityOptionUrl}${request.url}`, request.data)
        .reply(202, {
          "serverCorrelationId": "e4ec6346-65e0-4761-8c91-51a06f423008", "status": "pending", "notificationMethod": "polling", "objectReference": "1227", "pollLimit": 100
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(request.data).toHaveProperty('requestDate');
      expect(response.status).toBe(202);
      expect(response.data).toHaveProperty('status');
      expect(response.data.status).toBe('pending');
      expect(response.data).toHaveProperty('serverCorrelationId');
      expect(response.data).toHaveProperty('notificationMethod');
      expect(response.data.notificationMethod).toBe('polling');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });

    it('should return request data with property customData if customData is invoked', async function () {
      request.customData("customData");

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .post(`${this.securityOptionUrl}${request.url}`, request.data)
        .reply(202, {
          "serverCorrelationId": "e4ec6346-65e0-4761-8c91-51a06f423008", "status": "pending", "notificationMethod": "polling", "objectReference": "1227", "pollLimit": 100
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(request.data).toHaveProperty('customData');
      expect(response.status).toBe(202);
      expect(response.data).toHaveProperty('status');
      expect(response.data.status).toBe('pending');
      expect(response.data).toHaveProperty('serverCorrelationId');
      expect(response.data).toHaveProperty('notificationMethod');
      expect(response.data.notificationMethod).toBe('polling');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });

    it('should return request data with property metadata if metadata is invoked', async function () {
      request.metadata([{ "key": "value" }]);

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .post(`${this.securityOptionUrl}${request.url}`, request.data)
        .reply(202, {
          "serverCorrelationId": "e4ec6346-65e0-4761-8c91-51a06f423008", "status": "pending", "notificationMethod": "polling", "objectReference": "1227", "pollLimit": 100
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(request.data).toHaveProperty('metadata');
      expect(response.status).toBe(202);
      expect(response.data).toHaveProperty('status');
      expect(response.data.status).toBe('pending');
      expect(response.data).toHaveProperty('serverCorrelationId');
      expect(response.data).toHaveProperty('notificationMethod');
      expect(response.data.notificationMethod).toBe('polling');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });
  })

  describe('ViewBillPayment', function () {
    const authTokenHeader = authHeader(false);
    const authRefreshHeader = authHeader(true);

    let request;

    beforeEach(async () => {
      request = new mmapi.billPayment.viewBillPayment({ 'accountid': '1' }, "REF-000001");
    })

    afterEach(async () => {
    });

    it('should return a bill payment object array and indicate via response header how many bill payments available in total', async function () {
      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .get(`${this.securityOptionUrl}${request.url}`)
        .reply(200, [
          { "customerReference": "customer ref 0001", "billPaymentStatus": "unpaid", "amountPaid": "0.99", "currency": "GBP", "supplementaryBillReferenceDetails": [{ "paymentReferenceType": "type 1", "paymentReferenceValue": "value 1" }], "requestDate": "2021-02-18T08:21:27", "creationDate": "2021-02-17T00:00:00", "modificationDate": "2021-02-18T08:20:58" }, { "customerReference": "customer ref 0001", "billPaymentStatus": "unpaid", "amountPaid": "0.99", "currency": "GBP", "supplementaryBillReferenceDetails": [{ "paymentReferenceType": "type 1", "paymentReferenceValue": "value 1" }], "requestDate": "2021-02-18T08:21:27", "creationDate": "2021-02-17T00:00:00", "modificationDate": "2021-02-18T08:20:58" }, { "billPaymentStatus": "unpaid", "amountPaid": "55.00", "currency": "AED", "requestDate": "2021-02-18T08:21:27", "creationDate": "2021-02-17T00:00:00", "modificationDate": "2021-02-18T08:20:58" }, { "billPaymentStatus": "unpaid", "amountPaid": "55.00", "currency": "AED", "requestDate": "2021-02-18T08:21:27", "creationDate": "2021-02-17T00:00:00", "modificationDate": "2021-02-18T08:20:58" }, { "billPaymentStatus": "unpaid", "amountPaid": "55.00", "currency": "AED", "requestDate": "2021-02-18T08:21:27", "creationDate": "2021-02-17T00:00:00", "modificationDate": "2021-02-18T08:20:58" }
        ], {
          "Content-Type": "application/json",
          'x-records-available-count': 5,
          'x-records-returned-count': 5,
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(response.status).toBe(200);
      expect(response.data.length).toBe(5);
      if (response.data.length) {
        response.data.forEach(data => {
          expect(data).toHaveProperty('billPaymentStatus');
          expect(data).toHaveProperty('amountPaid');
          expect(data).toHaveProperty('currency');
        });
      }
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
          { "customerReference": "customer ref 0001", "billPaymentStatus": "unpaid", "amountPaid": "0.99", "currency": "GBP", "supplementaryBillReferenceDetails": [{ "paymentReferenceType": "type 1", "paymentReferenceValue": "value 1" }], "requestDate": "2021-02-18T08:21:27", "creationDate": "2021-02-17T00:00:00", "modificationDate": "2021-02-18T08:20:58" }, { "customerReference": "customer ref 0001", "billPaymentStatus": "unpaid", "amountPaid": "0.99", "currency": "GBP", "supplementaryBillReferenceDetails": [{ "paymentReferenceType": "type 1", "paymentReferenceValue": "value 1" }], "requestDate": "2021-02-18T08:21:27", "creationDate": "2021-02-17T00:00:00", "modificationDate": "2021-02-18T08:20:58" }, { "billPaymentStatus": "unpaid", "amountPaid": "55.00", "currency": "AED", "requestDate": "2021-02-18T08:21:27", "creationDate": "2021-02-17T00:00:00", "modificationDate": "2021-02-18T08:20:58" }, { "billPaymentStatus": "unpaid", "amountPaid": "55.00", "currency": "AED", "requestDate": "2021-02-18T08:21:27", "creationDate": "2021-02-17T00:00:00", "modificationDate": "2021-02-18T08:20:58" }, { "billPaymentStatus": "unpaid", "amountPaid": "55.00", "currency": "AED", "requestDate": "2021-02-18T08:21:27", "creationDate": "2021-02-17T00:00:00", "modificationDate": "2021-02-18T08:20:58" }
        ], {
          "Content-Type": "application/json",
          'x-records-available-count': 5,
          'x-records-returned-count': 5,
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(request.params).toHaveProperty('offset');
      expect(response.status).toBe(200);
      expect(response.data.length).toBe(5);
      if (response.data.length) {
        response.data.forEach(data => {
          expect(data).toHaveProperty('billPaymentStatus');
          expect(data).toHaveProperty('amountPaid');
          expect(data).toHaveProperty('currency');
        });
      }
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
          { "customerReference": "customer ref 0001", "billPaymentStatus": "unpaid", "amountPaid": "0.99", "currency": "GBP", "supplementaryBillReferenceDetails": [{ "paymentReferenceType": "type 1", "paymentReferenceValue": "value 1" }], "requestDate": "2021-02-18T08:21:27", "creationDate": "2021-02-17T00:00:00", "modificationDate": "2021-02-18T08:20:58" }, { "customerReference": "customer ref 0001", "billPaymentStatus": "unpaid", "amountPaid": "0.99", "currency": "GBP", "supplementaryBillReferenceDetails": [{ "paymentReferenceType": "type 1", "paymentReferenceValue": "value 1" }], "requestDate": "2021-02-18T08:21:27", "creationDate": "2021-02-17T00:00:00", "modificationDate": "2021-02-18T08:20:58" }, { "billPaymentStatus": "unpaid", "amountPaid": "55.00", "currency": "AED", "requestDate": "2021-02-18T08:21:27", "creationDate": "2021-02-17T00:00:00", "modificationDate": "2021-02-18T08:20:58" }, { "billPaymentStatus": "unpaid", "amountPaid": "55.00", "currency": "AED", "requestDate": "2021-02-18T08:21:27", "creationDate": "2021-02-17T00:00:00", "modificationDate": "2021-02-18T08:20:58" }, { "billPaymentStatus": "unpaid", "amountPaid": "55.00", "currency": "AED", "requestDate": "2021-02-18T08:21:27", "creationDate": "2021-02-17T00:00:00", "modificationDate": "2021-02-18T08:20:58" }
        ], {
          "Content-Type": "application/json",
          'x-records-available-count': 5,
          'x-records-returned-count': 5,
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(request.params).toHaveProperty('limit');
      expect(response.status).toBe(200);
      expect(response.data.length).toBe(5);
      if (response.data.length) {
        response.data.forEach(data => {
          expect(data).toHaveProperty('billPaymentStatus');
          expect(data).toHaveProperty('amountPaid');
          expect(data).toHaveProperty('currency');
        });
      }
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
          { "customerReference": "customer ref 0001", "billPaymentStatus": "unpaid", "amountPaid": "0.99", "currency": "GBP", "supplementaryBillReferenceDetails": [{ "paymentReferenceType": "type 1", "paymentReferenceValue": "value 1" }], "requestDate": "2021-02-18T08:21:27", "creationDate": "2021-02-17T00:00:00", "modificationDate": "2021-02-18T08:20:58" }, { "customerReference": "customer ref 0001", "billPaymentStatus": "unpaid", "amountPaid": "0.99", "currency": "GBP", "supplementaryBillReferenceDetails": [{ "paymentReferenceType": "type 1", "paymentReferenceValue": "value 1" }], "requestDate": "2021-02-18T08:21:27", "creationDate": "2021-02-17T00:00:00", "modificationDate": "2021-02-18T08:20:58" }, { "billPaymentStatus": "unpaid", "amountPaid": "55.00", "currency": "AED", "requestDate": "2021-02-18T08:21:27", "creationDate": "2021-02-17T00:00:00", "modificationDate": "2021-02-18T08:20:58" }, { "billPaymentStatus": "unpaid", "amountPaid": "55.00", "currency": "AED", "requestDate": "2021-02-18T08:21:27", "creationDate": "2021-02-17T00:00:00", "modificationDate": "2021-02-18T08:20:58" }, { "billPaymentStatus": "unpaid", "amountPaid": "55.00", "currency": "AED", "requestDate": "2021-02-18T08:21:27", "creationDate": "2021-02-17T00:00:00", "modificationDate": "2021-02-18T08:20:58" }
        ], {
          "Content-Type": "application/json",
          'x-records-available-count': 5,
          'x-records-returned-count': 5,
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(request.params).toHaveProperty('fromDateTime');
      expect(response.status).toBe(200);
      expect(response.data.length).toBe(5);
      if (response.data.length) {
        response.data.forEach(data => {
          expect(data).toHaveProperty('billPaymentStatus');
          expect(data).toHaveProperty('amountPaid');
          expect(data).toHaveProperty('currency');
        });
      }
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
          { "customerReference": "customer ref 0001", "billPaymentStatus": "unpaid", "amountPaid": "0.99", "currency": "GBP", "supplementaryBillReferenceDetails": [{ "paymentReferenceType": "type 1", "paymentReferenceValue": "value 1" }], "requestDate": "2021-02-18T08:21:27", "creationDate": "2021-02-17T00:00:00", "modificationDate": "2021-02-18T08:20:58" }, { "customerReference": "customer ref 0001", "billPaymentStatus": "unpaid", "amountPaid": "0.99", "currency": "GBP", "supplementaryBillReferenceDetails": [{ "paymentReferenceType": "type 1", "paymentReferenceValue": "value 1" }], "requestDate": "2021-02-18T08:21:27", "creationDate": "2021-02-17T00:00:00", "modificationDate": "2021-02-18T08:20:58" }, { "billPaymentStatus": "unpaid", "amountPaid": "55.00", "currency": "AED", "requestDate": "2021-02-18T08:21:27", "creationDate": "2021-02-17T00:00:00", "modificationDate": "2021-02-18T08:20:58" }, { "billPaymentStatus": "unpaid", "amountPaid": "55.00", "currency": "AED", "requestDate": "2021-02-18T08:21:27", "creationDate": "2021-02-17T00:00:00", "modificationDate": "2021-02-18T08:20:58" }, { "billPaymentStatus": "unpaid", "amountPaid": "55.00", "currency": "AED", "requestDate": "2021-02-18T08:21:27", "creationDate": "2021-02-17T00:00:00", "modificationDate": "2021-02-18T08:20:58" }
        ], {
          "Content-Type": "application/json",
          'x-records-available-count': 5,
          'x-records-returned-count': 5,
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(request.params).toHaveProperty('toDateTime');
      expect(response.status).toBe(200);
      expect(response.data.length).toBe(5);
      if (response.data.length) {
        response.data.forEach(data => {
          expect(data).toHaveProperty('billPaymentStatus');
          expect(data).toHaveProperty('amountPaid');
          expect(data).toHaveProperty('currency');
        });
      }
      expect(response.headers).toHaveProperty('x-records-available-count');
      expect(response.headers).toHaveProperty('x-records-returned-count');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });
  })
});