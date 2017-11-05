var bittrex = require('node-bittrex-api');

var jsonfile = require('jsonfile')

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
    // console.log(data);
    var obj = data.result[0];
    var high = obj.High;
    // console.log(high)
    var low = obj.Low;
    var diff = high - low;
    var change = diff/low;
    var perc_change = change*100;
    console.log(perc_change);
    obj = {perc_change: perc_change}

    jsonfile.writeFile(file, obj, function (err) {
        console.error(err)
    })
   
});