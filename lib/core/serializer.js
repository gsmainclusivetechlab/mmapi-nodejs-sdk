class Json {
  encode(request) {
    return JSON.stringify(request.body);
  }

  decode(body) {
    return JSON.parse(body);
  }

  contentType() {
    return 'application/json';
  }
}

class FormEncoded {
  encode(httpRequestBody) {
    this.encoded = new URLSearchParams(httpRequestBody);
    return this.encoded;
  }
}

/**
   * Identifying a Target Account
   */
const buildAccountIdentifiers = (accountIdentifiers) => {
  const accountIdentifierCount = Object.keys(accountIdentifiers).length;

  /**
   * Two methods are provided for identifying an account, the single identifier method, and the multiple identifiers method.
   * Single - The path uses a ‘’ delimiter to separate the identifier. Each key / value is delimited by ‘/’.
   * Multiple - The path uses a ‘$’ delimiter to separate each identifier, up to a limit of three account identifiers. Each key / value is delimited by ‘@’.
   */
  const keyValueDelimiter = accountIdentifierCount === 1 ? '/' : '@';
  const keyValuePairDelimiter = accountIdentifierCount === 1 ? '' : '$';

  return Object.entries(accountIdentifiers).map(accountIdentifier => accountIdentifier.join(`${keyValueDelimiter}`)).join(`${keyValuePairDelimiter}`)
}

module.exports = {
  FormEncoded,
  Json,
  buildAccountIdentifiers
};
