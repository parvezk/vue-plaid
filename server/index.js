'use strict';

var util = require('util');

var envvar = require('envvar');
var express = require('express');
var bodyParser = require('body-parser');
var plaid = require('plaid');

var APP_PORT = 8000;
var PLAID_CLIENT_ID='5e849b845d386a0013f683c2'
var PLAID_PUBLIC_KEY='84a7445d0079ac82674a4ce1d831e3'
var PLAID_SECRET ='e33f5f8063fa05c1265ca7b9eadbc0';
var PLAID_ENV = 'sandbox'

// We store the access_token in memory
// In production, store it in a secure persistent data store
var ACCESS_TOKEN = null;
var PUBLIC_TOKEN = null;
var ITEM_ID = null;

// Initialize the Plaid client
var client = new plaid.Client(
  PLAID_CLIENT_ID,
  PLAID_SECRET,
  PLAID_PUBLIC_KEY,
  plaid.environments[PLAID_ENV],
  {version: '2018-05-22'}
);

var app = express();
app.use(express.static('./public'));
//app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

var prettyPrintResponse = response => {
  console.log(util.inspect(response, {colors: true, depth: 4}));
};

var server = app.listen(APP_PORT, function() {
  console.log('plaid-quickstart server listening on port ' + APP_PORT);
});

// API
app.post('/get_access_token', function(request, response, next) {
  PUBLIC_TOKEN = request.body.public_token;
  client.exchangePublicToken(PUBLIC_TOKEN, function(error, 
tokenResponse) {
  
    if (error != null) {
      var msg = 'Could not exchange public_token!';
      console.log(msg + '\n' + JSON.stringify(error));
      return response.json({
        error: msg
      });
    }
    ACCESS_TOKEN = tokenResponse.access_token;
    ITEM_ID = tokenResponse.item_id;
    //prettyPrintResponse(tokenResponse);
    response.json({
      access_token: ACCESS_TOKEN,
      item_id: ITEM_ID,
      error: false
    });
  });
});

// Retrieve ACH or EFT Auth data for an Item's accounts
// https://plaid.com/docs/#auth
app.get('/auth', function(request, response, next) {
  console.log('server@', request)
  client.getAuth(ACCESS_TOKEN, function(error, authResponse) {
    if (error != null) {
      prettyPrintResponse(error);
      return response.json({
        error: error,
      });
    }
    prettyPrintResponse(authResponse);
    response.json({error: null, auth: authResponse});
  });
});

// Retrieve information about an Item
// https://plaid.com/docs/#retrieve-item
app.get('/item', function(request, response, next) {
  // Pull the Item - this includes information about available products,
  // billed products, webhook information, and more.
  client.getItem(ACCESS_TOKEN, async function(error, itemResponse) {
    if (error != null) {
      prettyPrintResponse(error);
      return response.json({
        error: error
      });
    }
    const instId = itemResponse.item.institution_id;
    // Fetches a single institution from the Plaid API.

    // Also pull information about the institution

    const { institution } = await client.getInstitutionById(instId, {
      include_optional_metadata: true,
    });

    response.json(institution);

  });
});