'use strict';

//Constantes de VIP.
const view = require('../Base/view');
const presenter = require('../Base/presenter');
const libraries = require('../Base/libraries');

/**
 * * Función evaConnectManager: Encargada de orquestar la resolución de intenciones.
 * @param  {JSON} event
 * @returns {JSON} resultMap 
 */
async function evaConnectManager(event) {
    let attributes = await view.managerView.initAttributes(event);
    if (event.sessionState != undefined && event.sessionState.sessionAttributes != undefined) {
        await presenter.evaFlowPresenter.evaConnectSpeachRollOver(attributes);
    } else {
        await presenter.evaFlowPresenter.evaConnectSpeachrFirstTime(attributes);
    }
    await presenter.evaFlowPresenter.evaConnectSpeachSessionMode(attributes);
    return await view.managerView.saveAttributes(await view.responseView.getNLPResponse(attributes), attributes);
}

module.exports.evaConnectManager = evaConnectManager;
