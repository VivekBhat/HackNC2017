'use strict';
var Alexa = require('alexa-sdk');
var request = require('request');
// var percentage_change;
var value;
const appid = 'amzn1.ask.skill.584432f0-752c-4cf9-aa20-1c1792d3e702';

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = appid;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
var handlers = {
    'LaunchRequest': function() {
        this.emit('LaunchIntent');
    },

    'LaunchIntent': function() {
        this.emit(':ask', "Hi, do you want to know about bitcoin sentiment or its price change?");
    },

    'SentimentIntent': function() {
        var myCrypto = this.event.request.intent.slots.myCrypto.value;
        this.emit(':tell', 'lol');
    },

    'PercentIntent': function() {
        var myPercent = this.event.request.intent.slots.myPercent.value;
        this.emit(':tell', 'The value has changed by 6.37%');
    },
};      

 
