'use strict';

(function () {

    /**
     * * console.VIPLog: Utilizada para mostrar aquellos logs que consideramos correctos.
    */
    console.VIPLog = function (message, optionalParams) {
        if (((process.env.ENABLE_LOGS != undefined) ? process.env.ENABLE_LOGS : 'false') == 'true') {
            console.log('✅\t' + message, optionalParams != undefined ? optionalParams : "");
        }
    };

    /**
     * * console.VIPTrace: Utilizada para mostrar aquellos logs que vamos a borrar por que son innecesarios, sin embarrgo nos ayudan a depurar.
    */
    console.VIPTrace = function (message, optionalParams) {
        if (((process.env.ENABLE_LOGS != undefined) ? process.env.ENABLE_LOGS : 'false') == 'true') {
            console.trace('🔻\t' + message, optionalParams != undefined ? optionalParams : "");
        }
    };

    /**
     * * console.VIPWarning: Utilizada para mostrar aquellos logs que no impiden el correcto funcionamiento pero queremos que queden en el log.
    */
    console.VIPWarning = function (message, optionalParams) {
        if (((process.env.ENABLE_LOGS != undefined) ? process.env.ENABLE_LOGS : 'false') == 'true') {
            console.warn('⚠️\t' + message, optionalParams != undefined ? optionalParams : "");
        }
    };

    /**
     * * console.VIPArchitecture: Utilizada para mostrar aquellos logs exclusivos de la Arquitectura VIP..
    */
    console.VIPArchitecture = function (message, optionalParams) {
        console.info('🔵\t' + message, optionalParams != undefined ? optionalParams : "");
    };

    /**
     * * console.VIPError: Utilizada para mostrar aquellos logs que son generados cuando ocurre un error.
    */
    console.VIPError = function (message, optionalParams) {
        console.error('🆘\t' + message, optionalParams != undefined ? optionalParams : "");
    };

})();