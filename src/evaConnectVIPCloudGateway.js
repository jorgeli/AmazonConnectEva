'use strict'

//Constantes de VIP.
const view = require('./Base/view');
const extensions = require('./Base/extensions');

/**
 * * Export para ser utilizado en AWS Lamda.
 * @param  {JSON} event
 * @returns {JSON} resultMap 
 */
exports.handler = async (event) => {
    console.VIPArchitecture('Datos de entrada a la arquitectura event: %j', event);
    return view.evaConnectView.evaConnectManager(event);
};
