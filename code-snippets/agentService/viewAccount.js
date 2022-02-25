/**
 * Set up your function to be invoked
 */
const viewAccount = async (msisdn, debug = false) => {
    try {
        /**
         * Construct a request object and set desired parameters
         */
        const request = new mmapi.agentService.viewAccount({ "msisdn": `${msisdn}` });

        if (debug) {
            console.log("Request: ", JSON.stringify(request, null, 4));
        }

        /**
         * Call API with your client and get a response for your call
         */
        const response = await client.execute(request);

        if (debug) {
            console.log("Response Status: ", response.status);
            console.log("Response Data: ", JSON.stringify(response.data, null, 4));
        }

        /**
         * Return a successful response
         */
        return response;
    } catch (err) {
        /**
         * Handle any errors from the call
         */
        if (debug) {
            console.log(err);
        }

        /**
         * Return an error response
         */
        return err;
    }
};

/**
 * Invoke the function
 */
viewAccount('<<REPLACE-WITH-MSISDN>>', true);