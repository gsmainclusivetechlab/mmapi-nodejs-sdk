/**
 * Reversal Object Definition
 */
class Reversal {
  constructor() {
    this.data = {}
  }

  requestingOrganisationTransactionReference(requestingOrganisationTransactionReference) {
    this.data['requestingOrganisationTransactionReference'] = requestingOrganisationTransactionReference;
    return this;
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

  subType(subType) {
    this.data['subType'] = subType;
    return this;
  }

  amount(amount) {
    this.data['amount'] = amount;
    return this;
  }

  currency(currency) {
    this.data['currency'] = currency;
    return this;
  }

  descriptionText(descriptionText) {
    this.data['descriptionText'] = descriptionText;
    return this;
  }

  fees(fees) {
    this.data['fees'] = fees;
    return this;
  }

  geoCode(geoCode) {
    this.data['geoCode'] = geoCode;
    return this;
  }

  requestingOrganisation(requestingOrganisation) {
    this.data['requestingOrganisation'] = requestingOrganisation;
    return this;
  }

  servicingIdentity(servicingIdentity) {
    this.data['servicingIdentity'] = servicingIdentity;
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

module.exports = { Reversal };
