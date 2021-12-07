/**
 * Quotation Object Definition
 */
class Quotation {
  constructor() {
    this.data = {}
  }

  creditParty(creditParty) {
    this.data['creditParty'] = creditParty;
    return this;
  }

  debitParty(debitParty) {
    this.data['debitParty'] = debitParty;
    return this;
  }

  type(type) {
    this.data['type'] = type;
    return this;
  }

  subtype(subtype) {
    this.data['subtype'] = subtype;
    return this;
  }

  requestAmount(requestAmount) {
    this.data['requestAmount'] = requestAmount;
    return this;
  }

  requestCurrency(requestCurrency) {
    this.data['requestCurrency'] = requestCurrency;
    return this;
  }

  chosenDeliveryMethod(chosenDeliveryMethod) {
    this.data['chosenDeliveryMethod'] = chosenDeliveryMethod;
    return this;
  }

  originCountry(originCountry) {
    this.data['originCountry'] = originCountry;
    return this;
  }

  receivingCountry(receivingCountry) {
    this.data['receivingCountry'] = receivingCountry;
    return this;
  }

  recipientKyc(recipientKyc) {
    this.data['recipientKyc'] = recipientKyc;
    return this;
  }

  senderKyc(senderKyc) {
    this.data['senderKyc'] = senderKyc;
    return this;
  }

  requestingOrganisation(requestingOrganisation) {
    this.data['requestingOrganisation'] = requestingOrganisation;
    return this;
  }

  sendingServiceProviderCountry(sendingServiceProviderCountry) {
    this.data['sendingServiceProviderCountry'] = sendingServiceProviderCountry;
    return this;
  }

  requestDate(requestDate) {
    this.data['requestDate'] = requestDate;
    return this;
  }

  customData(customData) {
    this.data['customData'] = customData;
    return this;
  }

  metadata(metadata) {
    this.data['metadata'] = metadata;
    return this;
  }
}

module.exports = { Quotation };
