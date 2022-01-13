'use strict';

const mmapi = require('../../../lib/index');
const nock = require('nock');

describe('Quotation', function () {
  let environment = new mmapi.core.SandboxEnvironment('consumerKey', 'consumerSecret', 'apiKey', 'ENHANCED_LEVEL', 'https://test.com/callback');

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

  describe('ViewQuotation', function () {
    const authTokenHeader = authHeader(false);
    const authRefreshHeader = authHeader(true);

    let request;

    beforeEach(async () => {
      request = new mmapi.internationalTransfer.viewQuotation("REF-1636533162268");
    })

    afterEach(async () => {
    });

    it('should return a link object if request is valid', async function () {
      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .get(`${this.securityOptionUrl}${request.url}`)
        .reply(200, {
          "quotationReference": "REF-1636533162268", "creditParty": [{ "key": "accountid", "value": "2000" }, { "key": "linkref", "value": "REF-1621839627337" }, { "key": "linkref", "value": "REF-1635445811066" }], "debitParty": [{ "key": "accountid", "value": "2999" }], "type": "inttransfer", "subType": "abc", "quotationStatus": "completed", "requestAmount": "75.30", "requestCurrency": "RWF", "chosenDeliveryMethod": "agent", "originCountry": "AD", "receivingCountry": "AD", "senderKyc": { "nationality": "GB", "dateOfBirth": "1970-07-03", "occupation": "Manager", "employerName": "MFX", "contactPhone": "+447125588999", "gender": "m", "idDocument": [{ "idType": "nationalidcard", "idNumber": "1234567", "issueDate": "2018-07-03", "expiryDate": "2021-07-03", "issuer": "UKPA", "issuerPlace": "GB", "issuerCountry": "GB" }], "postalAddress": { "addressLine1": "111 ABC Street", "city": "New York", "stateProvince": "New York", "postalCode": "ABCD", "country": "GB" }, "subjectName": { "title": "Mr", "firstName": "Luke", "middleName": "R", "lastName": "Skywalker", "fullName": "Luke R Skywalker", "nativeName": "ABC" }, "emailAddress": "luke.skywalkeraaabbb@gmail.com", "birthCountry": "GB" }, "sendingServiceProviderCountry": "AD", "creationDate": "2021-11-10T08:32:42", "modificationDate": "2021-11-10T08:32:42", "requestDate": "2018-07-03T11:43:27", "customData": [{ "key": "keytest", "value": "keyvalue" }]
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('quotationReference');
      expect(response.data).toHaveProperty('creditParty');
      expect(response.data).toHaveProperty('debitParty');
      expect(response.data).toHaveProperty('requestAmount');
      expect(response.data).toHaveProperty('requestCurrency');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });
  })
});