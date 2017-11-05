var coinbase = require('coinbase');

var coinbase_access_key = process.env.COINBASE_API_KEY;
var coinbase_secret_key = process.env.COINBASE_API_SECRET;

var client   = new coinbase.Client({'apiKey': coinbase_access_key, 'apiSecret': coinbase_secret_key});

var logger = require('logops');

logger.setLevel('DEBUG');

logger.debug('This is an example');

currencyCode = 'USD'  // can also use EUR, CAD, etc.

// client.getBuyPrice({'currencyPair': 'BTC-USD'}, function(err, obj) {
// console.log('total amount: ' + obj.pagination);
// });
// 
client.getSpotPrice({'currency': currencyCode,'date': '2016-10-02'}, function(err, price) {
  console.log('Current bitcoin price in ' + currencyCode + ': ' +  price.data.amount);
});

// client.getTime(function(err, time) {
//   console.log(time.data.iso);
// });
