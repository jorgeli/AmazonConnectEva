'use strict';

//Constantes de VIP.
const Attributes = require('../Classes/attributes');

/**
 * * Función initAttributes: permite recuperar de la sessión los atributos.
 * @param {JSON} event
 * @returns {Attributes} attributes
 */
async function initAttributes(event) {
    let attributes = new Attributes();
    try {
        if (event.Details != undefined && event.Details.Parameters != undefined) {
            //Primera ejecución.
            attributes.session.evaFirstTime = true;
            attributes.session.inputTranscriptFromNLP = process.env.EVA_INIT_PHRASE
            attributes.session.connectPhoneNumber = event.Details.ContactData.CustomerEndpoint.Address;
            console.VIPArchitecture('Attributes inicializados correctamente por primera vez: %j', attributes);
        } else {
            //Siguientes ejecuciones.
            attributes.session.evaFirstTime = false;
            if (event.sessionState != undefined && event.sessionState.sessionAttributes != undefined && event.sessionState.sessionAttributes.attributesFromVIP != undefined && event.sessionState.sessionAttributes.attributesFromVIP != '') {
                //Revisamos si tenemos atributos.
                console.VIPLog('Inicializamos Attributes desde la sesión');
                attributes.init(JSON.parse(event.sessionState.sessionAttributes.attributesFromVIP));
            }
            //Obtenemos lo minimo que nos manda Connect.
            console.VIPLog('Inicializamos los datos de session');
            attributes.session.evaSessionCode = event.sessionState.sessionAttributes != undefined ? event.sessionState.sessionAttributes.evaSessionCode : ""
            attributes.session.evaSessionMode = event.sessionState.sessionAttributes != undefined ? event.sessionState.sessionAttributes.evaSessionMode : ""
            //Obtenemos lo minimo que nos manda LEX o eva.
            console.VIPLog('Inicializamos Attributes desde LEX o eva');
            attributes.session.intent = event.interpretations[0].intent.name != undefined ? event.interpretations[0].intent.name : process.env.FALLBACK_INTENT
            attributes.session.confidence = event.interpretations[0].nluConfidence != undefined ? event.interpretations[0].nluConfidence : 1.0
            attributes.session.entities = JSON.stringify(event.interpretations[0].intent.slots).replaceAll("\"", "'")
            //obtenemos aquello que viene desde Connect para operar con eva.
            console.VIPLog('Inicializamos los datos de Connect para operar con eva');
            attributes.session.connectPhoneNumber = event.sessionState.sessionAttributes != undefined ? event.sessionState.sessionAttributes.connectPhoneNumber : ""
            //Mostramos lo que dice el bot para facilitar los logs.
            console.VIPArchitecture('event.inputTranscript %j', event.inputTranscript);
            attributes.session.inputTranscriptFromNLP = event.inputTranscript;
            console.VIPArchitecture('Attributes inicializados correctamente: %j', attributes);
        }
        return attributes;
    } catch (error) {
        console.VIPError('Error en Attributes: ' + error);
        console.VIPArchitecture('Attributes inicializados con error: %j', attributes);
        return attributes;
    }
}

/**
 * * Función saveAttributes: permite guardar los atributos.
 * @param {JSON} NLPResponse
 * @param {Attributes} attributes
 */
async function saveAttributes(NLPResponse, attributes = new Attributes().init(attributes)) {
    try {
        console.VIPArchitecture('Tenemos una respuesta desde la lógica de la intención: %j', attributes);
        if (attributes.session.evaFirstTime == false) {
            clearUnnecesarySessionAttributes(attributes);
            NLPResponse.sessionState.sessionAttributes.attributesFromVIP = JSON.stringify(attributes, null, 2);
        }
        console.VIPArchitecture('Attributes almacenados en la sesion correctamente: %j', NLPResponse);
        return NLPResponse;
    } catch (error) {
        console.VIPError('saveAttributes try error: ' + error);
        return NLPResponse;
    }
}

/**
 * * Función saveAttributes: permite guardar los atributos.
 * @param {Attributes} attributes
 * @param {Attributes} attributes
 */
async function clearUnnecesarySessionAttributes(attributes = new Attributes().init(attributes)) {
    try {
        console.VIPArchitecture('clearUnnecesarySessionAttributes INIT: %j', attributes);
        //limpiamos todo aquello que no sea necesario en Connect.
        attributes.session.connectPhoneNumber = "";
        attributes.session.evaAccessToken = "";
        attributes.session.evaSessionCode = "";
        attributes.session.evaBrokerResponse = "";
        console.VIPArchitecture('clearUnnecesarySessionAttributes END: %j', attributes);
        return attributes;
    } catch (error) {
        console.VIPError('clearUnnecesarySessionAttributes try error: ' + error);
        return attributes;
    }
}


module.exports.initAttributes = initAttributes;
module.exports.saveAttributes = saveAttributes;