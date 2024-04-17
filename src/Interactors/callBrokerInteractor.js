'use strict'

const libraries = require('../Base/libraries');
const Attributes = require('../Classes/attributes');
/**
 * * Función callBroker: Encargada de hacer la primera llamada al broker de eva.
 * @param  {Attributes} attributes
 * @returns {JSON} data 
 */
async function callBroker(attributes = new Attributes().init(attributes)) {
    console.VIPArchitecture('callBroker INIT attributes: %j', attributes);
    return new Promise(async (resolve, reject) => {
        var data = JSON.stringify({
            "text": attributes.session.inputTranscriptFromNLP,
            "code": "",
            "intent": process.env.STAR_INTENT,
            "confidence": 1.0,
            "entities": {},
            "context": {
                "connectPhoneNumber": attributes.session.connectPhoneNumber
            }
        });
        console.VIPLog('callBroker INIT data: %j', JSON.parse(data));
        var config = {
            method: 'post',
            url: process.env.URL,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'API-KEY': process.env.API_KEY,
                'PROJECT': process.env.PROJECT,
                'CHANNEL': process.env.CHANNEL,
                'OS': 'Windows',
                'USER-REF': 'test',
                'LOCALE': 'es-ES',
            },
            data: data
        };
        libraries.axios(config)
            .then(function (response) {
                console.VIPLog('callBroker response: %j', JSON.stringify(response.data));
                resolve(response.data);
            })
            .catch(function (error) {
                console.VIPLog(error);
                reject(error);
            });
    });
}

/**
 * * Función callBrokerWithID: Encargada de hacer las llamadas al broker de eva cuando tenemos una sesión.
 * @param  {Attributes} attributes
 * @returns {JSON} data 
 */
async function callBrokerWithID(attributes = new Attributes().init(attributes)) {
    console.VIPArchitecture('callBrokerWithID INIT attributes: %j', attributes);
    return new Promise(async (resolve, reject) => {
        var data = JSON.stringify({
            "text": attributes.session.inputTranscriptFromNLP,
            "code": "",
            "intent": attributes.session.intent,
            "confidence": attributes.session.confidence,
            "entities": {
                "allSlots": attributes.session.entities
            },
            "context": {
                "connectPhoneNumber": attributes.session.connectPhoneNumber
            }
        });
        console.VIPLog('callBrokerWithID INIT data: %j', JSON.parse(data));
        var config = {
            method: 'post',
            url: process.env.URL + attributes.session.evaSessionCode,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'API-KEY': process.env.API_KEY,
                'PROJECT': process.env.PROJECT,
                'CHANNEL': process.env.CHANNEL,
                'OS': 'Windows',
                'USER-REF': 'test',
                'LOCALE': 'es-ES',
            },
            data: data
        };
        libraries.axios(config)
            .then(function (response) {
                console.VIPLog('callBrokerWithID response: %j', JSON.stringify(response.data));
                resolve(response.data);
            })
            .catch(function (error) {
                console.VIPLog(error);
                reject(error);
            });
    });
}

module.exports.callBroker = callBroker;
module.exports.callBrokerWithID = callBrokerWithID;