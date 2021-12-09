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

const identifyAccount = (accountIdentifiers) => {
  const keyValueDelimiter = length === 1 ? '/' : '@';
  const keyValuePairDelimiter = length === 1 ? '' : '$';
  return Object.entries(accountIdentifiers).map(identifier => identifier.join(`${keyValueDelimiter}`)).join(`${keyValuePairDelimiter}`)
}

module.exports = {
  FormEncoded,
  Json,
  identifyAccount
};
