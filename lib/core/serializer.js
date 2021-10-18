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

module.exports = {
  FormEncoded,
  Json,
};
