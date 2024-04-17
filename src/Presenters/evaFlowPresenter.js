'use strict'

//Constantes de VIP.
const Attributes = require('../Classes/attributes');
const interactor = require('../Base/interactor');

/**
 * * Función evaConnectSpeachrFirstTime: Encargada de inicializar el flujo en eva.
 * @param  {Attributes} attributes
 * @returns {Attributes} attributes
 */
async function evaConnectSpeachrFirstTime(attributes = new Attributes().init(attributes)) {
    try {
        console.VIPArchitecture('evaConnectSpeachrFirstTime INIT attributes: %j', attributes);
        attributes.session.evaBrokerResponse = await interactor.callBrokerInteractor.callBroker(attributes);
        attributes.session.evaSessionCode = attributes.session.evaBrokerResponse.sessionCode;
        console.VIPArchitecture('evaConnectSpeachrFirstTime ENDED attributes: %j', attributes);
        return Promise.resolve(attributes);
    } catch (error) {
        console.VIPError('evaConnectSpeachrFirstTime ERROR: ', error);
        return Promise.resolve(attributes);
    }
}

/**
 * * Función evaConnectSpeachRollOver: Encargada de continuar el flujo en eva.
 * @param  {Attributes} attributes
 * @returns {Attributes} attributes
 */
async function evaConnectSpeachRollOver(attributes = new Attributes().init(attributes)) {
    try {
        console.VIPArchitecture('evaConnectSpeachRollOver INIT attributes: %j', attributes);
        if (attributes.session.evaSessionCode == '') {
            console.VIPArchitecture('attributes.session.evaSessionCode empty');
            attributes.session.evaBrokerResponse = await interactor.callBrokerInteractor.callBroker(attributes);
            attributes.session.evaSessionCode = attributes.session.evaBrokerResponse.sessionCode;
        } else {
            console.VIPArchitecture('all is correct we have evaAccessToken and evaSessionCode');
            attributes.session.evaBrokerResponse = await interactor.callBrokerInteractor.callBrokerWithID(attributes);
        }
        console.VIPArchitecture('evaConnectSpeachRollOver ENDED attributes: %j', attributes);
        return Promise.resolve(attributes);
    } catch (error) {
        console.VIPError('evaConnectSpeachRollOver ERROR: ', error);
        return Promise.resolve(attributes);
    }
}

/**
 * * Función evaConnectSpeachSessionMode: Encargada de simular el sistema de banderas de eva (DEBE SER ELIMINADA DE UN PROYECTO REAL).
 * @param  {Attributes} attributes
 * @returns {Attributes} attributes
 */
async function evaConnectSpeachSessionMode(attributes = new Attributes().init(attributes)) {
    try {
        console.VIPLog('evaConnectSpeachSessionMode INIT attributes: %j', attributes);
        attributes.session.evaSessionMode = "Continue";
        if (attributes.session.evaBrokerResponse.answers[0].technicalText != null && attributes.session.evaBrokerResponse.answers[0].technicalText.agentHandover != undefined) {
            attributes.session.evaSessionMode = "Agent";
        } else if (attributes.session.evaBrokerResponse.answers[0].technicalText != null && attributes.session.evaBrokerResponse.answers[0].technicalText.endConversation != undefined) {
            attributes.session.evaSessionMode = "Close";
        }
        console.VIPLog('evaConnectSpeachSessionMode ENDED attributes: %j', attributes);
        return Promise.resolve(attributes);
    } catch (error) {
        console.VIPError('evaConnectSpeachSessionMode ERROR: ', error);
        return Promise.resolve(attributes);
    }
}

module.exports.evaConnectSpeachrFirstTime = evaConnectSpeachrFirstTime;
module.exports.evaConnectSpeachRollOver = evaConnectSpeachRollOver;
module.exports.evaConnectSpeachSessionMode = evaConnectSpeachSessionMode;
