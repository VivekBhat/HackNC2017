var coinbase = require('coinbase');

var coinbase_access_key = process.env.COINBASE_API_KEY;
var coinbase_secret_key = process.env.COINBASE_API_SECRET;

console.log(process.env);

console.log(coinbase_access_key);
var client   = new coinbase.Client({'apiKey': coinbase_access_key, 'apiSecret': coinbase_secret_key});

// var Client = require('coinbase').Client;
// var client = new Client({'accessToken': accessToken, 'refreshToken': refreshToken});


// client.getAccounts({}, function(err, accounts) {
//   accounts.forEach(function(acct) {
//     console.log('my bal: ' + acct.balance.amount + ' for ' + acct.name);
//   });
// });

client.getBuyPrice({'currencyPair': 'BTC-USD'}, function(err, obj) {
  console.log('total amount: ' + obj.data.amount);
});