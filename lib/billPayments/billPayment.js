/**
 * Bill Payment Object Definition
 */
class BillPayment {
  constructor() {
    this.data = {}
  }

  serviceProviderPaymentReference(serviceProviderPaymentReference) {
    this.data['serviceProviderPaymentReference'] = serviceProviderPaymentReference;
    return this;
  }

  requestingOrganisationTransactionReference(requestingOrganisationTransactionReference) {
    this.data['requestingOrganisationTransactionReference'] = requestingOrganisationTransactionReference;
    return this;
  }

  paymentType(paymentType) {
    this.data['paymentType'] = paymentType;
    return this;
  }

  amountPaid(amountPaid) {
    this.data['amountPaid'] = amountPaid;
    return this;
  }

  currency(currency) {
    this.data['currency'] = currency;
    return this;
  }

  customerReference(customerReference) {
    this.data['customerReference'] = customerReference;
    return this;
  }

  requestingOrganisation(requestingOrganisation) {
    this.data['requestingOrganisation'] = requestingOrganisation;
    return this;
  }

  supplementaryBillReferenceDetails(supplementaryBillReferenceDetails) {
    this.data['supplementaryBillReferenceDetails'] = supplementaryBillReferenceDetails;
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

module.exports = { BillPayment };
