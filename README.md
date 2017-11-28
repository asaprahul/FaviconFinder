# MessageGenerator API

API to generate welcome text-messages for your hotel guests.

API implementation of the [Favicon Finder App](https://github.com/rahulsonwalkar/FaviconFinder)

## How it works:

Send POST requests to ```https://rahulfaviconfinder.herokuapp.com/API```

The body of the request should contain this object:

```
{
    'url': '<YOUR_URL>',      //Example: 'https://facebook.com'
}
```

```
Response body: "https://facebook.com/favicon.ico"
```


## Sample cURL POST request:

``` curl "}' -H "Content-Type: application/json" -X POST https://rahulfaviconfinder.herokuapp.com/API ```

**Note**:
1. If you are using the sample node.js code to send POST requests, install this dependency first:
`npm install request`

2. Make sure the URL contains either http:// or https:// prefix.

3. Some URLs might require www prefix
