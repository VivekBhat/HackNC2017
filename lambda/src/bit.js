var bittrex = require('node-bittrex-api');
var file = 'data.json'
var obj;

bittrex.options({
  'apikey' : process.env.BITTREX_API_SECRET,
  'apisecret' : process.env.BITTREX_API_SECRET,
});

bittrex.getmarketsummary({ market : 'USDT-BTC' }, function( data, err){
    if (err) {
        return console.error(err);
    }
    var obj = data.result[0];
    var high = obj.High;
    var low = obj.Low;
    var diff = high - low;
    var change = (diff/low);
    var perc_change = change*100;

    var writeFile = require('write');
    writeFile('foo.txt', perc_change.toFixed(2)+"%", function(err) {
      if (err) console.log(err);
    });   
});

