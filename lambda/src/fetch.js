'use strict';
var request = require('request');
// var percentage_change;
var value;
var https = require('http');

// request('http://www.vivekbhat.me/senti.json', function (error, response, body) {
//     console.log(body) // Print the HTML for the Google homepage.
//     value = body;
//     var obj = JSON.parse(value);
//     console.log(obj.value)
    
//     var change = obj.value;
    
//     exports.change=change;
//     //console.log("percentage_change: ", percentage_change)
//     });
var currentPriceEndpoint = 'http://www e.vivekbhat.me/senti.json'
    
function getPrice(eventCallback) {
    var url = currentPriceEndpoint;

    https.get(url, function(res) {
        var body = '';

        res.on('data', function (chunk) {
            body += chunk;
            console.log(body)
        });

        res.on('end', function () {
            var stringResult = parseJson(body);
            eventCallback(stringResult);
        });
    }).on('error', function (e) {
        console.log("Got error: ", e);
    });
}


getPrice(function (price) {
        var speechText = "";
            speechText = "<p> The latest price of 1 bitcoin as per coindesk is: " + speechText + price + "</p> ";
            cardContent = "The latest bitcoin price as per Coindesk is " + price;
        var speechOutput = {
            speech: "<speak>" + speechText + "</speak>",
            type: AlexaSkill.speechOutputType.SSML
        };
        var repromptOutput = {
            speech: "<speak>" + "Please ask again for today's prices if you want to know the latest prices." + "</speak>",
            type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };
});


function parseJson(inputText) {
    var resultObject = JSON.parse(inputText);
    return resultObject;
}