var Promise = require('promise');
var request = require('request');
// var percentage_change;
var value;

request('http://www.vivekbhat.me/senti.json', function (error, response, body) {
console.log(body) // Print the HTML for the Google homepage.
value = body;
var obj = JSON.parse(value);
console.log(obj.value)

var change = obj.value;
return change;
// exports.change=change;
//console.log("percentage_change: ", percentage_change)
})
