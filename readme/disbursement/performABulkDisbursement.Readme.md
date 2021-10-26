# Get An Account Balance


### Usage/Examples

```javascript

let performABulkDisbursement  = async () => {
  try{
      const request = new mmapi.disbursement.PerformABulkDisbursementRequest();
      // Required -
      request.data = buildRequestBody();
      // Required - String containing the URL which should receive the Callback. For asynchronous requests.
      request.headers['X-Callback-URL'] = buildXCallbackURL();

      const response = await client.execute(request);
      console.log(`Response Status: ${response.status}`);
      console.log(`Response Data: ${response.data}`);

      return response;
  } catch (e) {
      console.log(e)
  }
}
getAnAccountBalanceRequest()
```