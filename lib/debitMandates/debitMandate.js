/**
 * Debit Mandate Object Definition
 */
class DebitMandate {
  constructor() {
    this.data = {}
  }

  payee(payee) {
    this.data['payee'] = payee;
    return this;
  }

  mandateStatus(mandateStatus) {
    this.data['mandateStatus'] = mandateStatus;
    return this;
  }

  startDate(startDate) {
    this.data['startDate'] = startDate;
    return this;
  }

  amountLimit(amountLimit) {
    this.data['amountLimit'] = amountLimit;
    return this;
  }

  currency(currency) {
    this.data['currency'] = currency;
    return this;
  }

  endDate(endDate) {
    this.data['endDate'] = endDate;
    return this;
  }

  frequencyType(frequencyType) {
    this.data['frequencyType'] = frequencyType;
    return this;
  }

  numberOfPayments(numberOfPayments) {
    this.data['numberOfPayments'] = numberOfPayments;
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
}

module.exports = { DebitMandate };
