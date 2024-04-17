//Importamos todas las clases que necesita el Interactor (Arquitectura VIP).
const callBrokerInteractor = require('../Interactors/callBrokerInteractor');
const keycloakAuthInteractor = require('../Interactors/keycloakAuthInteractor');


//Exportamos todas las clases que necesita el Interactor (Arquitectura VIP).
module.exports.callBrokerInteractor = callBrokerInteractor;
module.exports.keycloakAuthInteractor = keycloakAuthInteractor;
