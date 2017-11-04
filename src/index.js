var crypto = {
    "Litecoin" : {
        "curr_info": "Litecoin, launched in the year 2011",
        "curr_val": "$123"
    }, 
    "Ethereum" : {
        "curr_info": "Launched in 2015, Ethereum is a decentralized software platform",
        "curr_val": "$300"
    }, 
    "Zcash" : {
        "curr_info": "Zcash, a decentralized and open-source cryptocurrency launched in the latter part of 2016",
        "curr_val": "$332"
    }
}


// Route the incoming request based on type (LaunchRequest, IntentRequest,
// etc.) The JSON body of the request is provided in the event parameter.
exports.handler = function (event, context) {
    try {
        console.log("event.session.application.applicationId=" + event.session.application.applicationId);

        /**
         * Uncomment this if statement and populate with your curr_val's application ID to
         * prevent someone else from configuring a curr_val that sends requests to this function.
         */

    if (event.session.application.applicationId !== "amzn1.ask.skill.e39741be-1043-489c-8bf2-14f35dfcfb9c") {
        context.fail("Invalid Application ID");
     }

        if (event.session.new) {
            onSessionStarted({requestId: event.request.requestId}, event.session);
        }

        if (event.request.type === "LaunchRequest") {
            onLaunch(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "IntentRequest") {
            onIntent(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "SessionEndedRequest") {
            onSessionEnded(event.request, event.session);
            context.succeed();
        }
    } catch (e) {
        context.fail("Exception: " + e);
    }
};

/**
 * Called when the session starts.
 */
function onSessionStarted(sessionStartedRequest, session) {
    // add any session init logic here
}

/**
 * Called when the user invokes the curr_val without specifying what they want.
 */
function onLaunch(launchRequest, session, callback) {
    getWelcomeResponse(callback)
}

/**
 * Called when the user specifies an intent for this curr_val.
 */
function onIntent(intentRequest, session, callback) {

    var intent = intentRequest.intent
    var intentName = intentRequest.intent.name;

    // dispatch custom intents to handlers here
    if (intentName == "CryptoIntent") {
        handleReindeerResponse(intent, session, callback)
    } else if (intentName == "AMAZON.YesIntent") {
        handleYesResponse(intent, session, callback)
    } else if (intentName == "AMAZON.NoIntent") {
        handleNoResponse(intent, session, callback)
    } else if (intentName == "AMAZON.HelpIntent") {
        handleGetHelpRequest(intent, session, callback)
    } else if (intentName == "AMAZON.StopIntent") {
        handleFinishSessionRequest(intent, session, callback)
    } else if (intentName == "AMAZON.CancelIntent") {
        handleFinishSessionRequest(intent, session, callback)
    } else {
        throw "Invalid intent"
    }
}

/**
 * Called when the user ends the session.
 * Is not called when the curr_val returns shouldEndSession=true.
 */
function onSessionEnded(sessionEndedRequest, session) {

}

// ------- curr_val specific logic -------

function getWelcomeResponse(callback) {
    var speechOutput = "Welcome to CryptoCurrency Facts! I can tell you about all the famous CryptoCurrencies: "+
    "Litecoin, Ethereum, Zcash" + 
    "I can only give facts about one at a time. Which cryptocurrency are you interested in?"

    var reprompt = "Which cryptocurrency are you interested in? You can find out about Litecoin, Ethereum, Zcash."

    var header = "CryptoCurrency Facts!"

    var shouldEndSession = false

    var sessionAttributes = {
        "speechOutput" : speechOutput,
        "repromptText" : reprompt
    }

    callback(sessionAttributes, buildSpeechletResponse(header, speechOutput, reprompt, shouldEndSession))

}

function handleReindeerResponse(intent, session, callback) {
    var cc = intent.slots.Reindeer.value.toLowerCase()

    if (!crypto[cc]) {
        var speechOutput = "That cryptocurrency isn't very famous. Try asking about another like Litecoin, Ethereum, Zcash."
        var repromptText = "Try asking about another cryptocurrency"
        var header = "Not Famous Enough"
    } else {
        var curr_info = crypto[cc].curr_info
        var curr_val = crypto[cc].curr_val
        var speechOutput = capitalizeFirst(cc) + " " + curr_info + " and " + curr_val + ". Do you want to hear about more cryptocurrency?"    
        var repromptText = "Do you want to hear about more cryptocurrency?"
        var header = capitalizeFirst(cc)
    }

    var shouldEndSession = false

    callback(session.attributes, buildSpeechletResponse(header, speechOutput, repromptText, shouldEndSession))
}

function handleYesResponse(intent, session, callback) {
    var speechOutput = "Great! Which cryptocurrency? You can find out about Litecoin, Ethereum, Zcash"
    var repromptText = speechOutput
    var shouldEndSession = false

    callback(session.attributes, buildSpeechletResponseWithoutCard(speechOutput, repromptText, shouldEndSession))
}

function handleNoResponse(intent, session, callback) {
    handleFinishSessionRequest(intent, session, callback)
}

function handleGetHelpRequest(intent, session, callback) {
    // Ensure that session.attributes has been initialized
    if (!session.attributes) {
        session.attributes = {};
    }

    var speechOutput = "I can tell you facts about all the famous cryptocurrency: " + 
    "Litecoin, Ethereum, Zcash" +
    " Which cryptocurrency are you interested in? Remember, I can only give facts about one cryptocurrency at a time." 

    var repromptText = speechOutput

    var shouldEndSession = false

    callback(session.attributes, buildSpeechletResponseWithoutCard(speechOutput, repromptText, shouldEndSession))

}

function handleFinishSessionRequest(intent, session, callback) {
    // End the session with a "Good bye!" if the user wants to quit the game
    callback(session.attributes,
        buildSpeechletResponseWithoutCard("Good bye! Thank you for using CryptoCurrency Facts!", "", true));
}


// ------- Helper functions to build responses for Alexa -------


function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        card: {
            type: "Simple",
            title: title,
            content: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildSpeechletResponseWithoutCard(output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    };
}

function capitalizeFirst(s) {
    return s.charAt(0).toUpperCase() + s.slice(1)
}