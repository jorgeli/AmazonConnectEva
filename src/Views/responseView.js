'use strict';

//Constantes de VIP.
const Attributes = require('../Classes/attributes');
const libraries = require('../Base/libraries');

/**
 * * Función getNLPResponse: Encargada de devolver el JSON de respuesta específico para el motor.
 * @param  {Attributes} attributes
 * @returns {JSON} resultMap
 */
async function getNLPResponse(attributes = new Attributes().init(attributes)) {
    try {
        console.VIPLog('getNLPResponse INIT attributes: %j', attributes);
        let resultMap = '';
        if (attributes.session.evaFirstTime) {
            //Respuesta para el inicio de conversacion desde Amazon Connect
            resultMap = {
                "evaInitMessage": attributes.session.evaBrokerResponse.answers[0].content,
                "evaSessionCode": attributes.session.evaSessionCode,
                "evaSessionMode": attributes.session.evaSessionMode,
                "connectPhoneNumber": attributes.session.connectPhoneNumber
            }
        } else {
            //Respuesta para el resto de pasos del flujo desde Connect - LEX - eva
            resultMap = {
                "messages": [{
                    "content": attributes.session.evaBrokerResponse.answers[0].content,
                    "contentType": "PlainText"
                }],
                "sessionState": {
                    "sessionAttributes": {
                        "evaSessionCode": attributes.session.evaSessionCode,
                        "evaSessionMode": attributes.session.evaSessionMode,
                        "connectPhoneNumber": attributes.session.connectPhoneNumber
                    },
                    "dialogAction": {
                        "type": "Close"
                    },
                    "intent": {
                        "name": attributes.session.intent,
                        "slots": {},
                        "state": "Fulfilled",
                        "confirmationState": "None"
                    }
                }
            }
        }
        console.VIPLog('getNLPResponse ENDED resultMap: %j', resultMap);
        return resultMap
    } catch (error) {
        console.VIPError('getNLPResponse ERROR: ', error);
        return Promise.resolve(attributes);
    }
}

module.exports.getNLPResponse = getNLPResponse;