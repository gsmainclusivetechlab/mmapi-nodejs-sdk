/**
 * Authorisation Code Object Definition
 */
class AuthorisationCode {
  constructor() {
    this.data = {}
  }

  amount(amount) {
    this.data['amount'] = amount;
    return this;
  }

  currency(currency) {
    this.data['currency'] = currency;
    return this;
  }

  amountType(amountType) {
    this.data['amountType'] = amountType;
    return this;
  }

  codeLifetime(codeLifetime) {
    this.data['codeLifetime'] = codeLifetime;
    return this;
  }

  holdFundsIndicator(holdFundsIndicator) {
    this.data['holdFundsIndicator'] = holdFundsIndicator;
    return this;
  }

  redemptionAccountIdentifiers(redemptionAccountIdentifiers) {
    this.data['redemptionAccountIdentifiers'] = redemptionAccountIdentifiers;
    return this;
  }

  redemptionChannels(redemptionChannels) {
    this.data['redemptionChannels'] = redemptionChannels;
    return this;
  }

  redemptionTransactionTypes(redemptionTransactionTypes) {
    this.data['redemptionTransactionTypes'] = redemptionTransactionTypes;
    return this;
  }

  requestingOrganisation(requestingOrganisation) {
    this.data['requestingOrganisation'] = requestingOrganisation;
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

module.exports = { AuthorisationCode };
