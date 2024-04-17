"use strict";

class Utils {

    /**
     * * Función getRandomIndexOfArray: Retorna una posición random desde un array.
     * @param  {Array} array
     * @returns  {Number} newRandomPosition
     */
    static getRandomIndexOfArray(array) {
        return Math.floor(Math.random() * Number(array.length));
    }

    /**
    * * Función getRandomPhrase: Retorna un string random desde un array.
    * @param  {Array} array
    * @returns  {String} newText
    */
    static getRandomPhrase(array) {
        var i = 0;
        i = Math.floor(Math.random() * Number(array.length));
        return (array[i]);
    }

    /**
     * * Función isUpperCharacter: Retorna True si el caracter es mayúscula, False si es minúscula y undefined si no cumple las condiciones anteriores.
     * @param  {String} character
     * @returns {Boolean} bolean
     */
    static isUpperCharacter(character) {
        if (/[A-Z]/.test(character)) {
            console.VIPLog("Is Upper Case: " + character);
            return true;
        } else if (/[a-z]/.test(character)) {
            console.VIPLog("Is Lower Case: " + character);
            return false;
        } else {
            console.VIPLog("Is A Number: " + character);
            return undefined;
        }
    }

    /**
    * * Función parserIntToAlphabetic: Retorna un string aleatorio del tamaño de la variable length
    * @param  {Number} length
    * @returns {String} string
    */
    static generateRandomString(length) {
        let randomString = '';
        const stringValues = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < length; i++)
            randomString += stringValues.charAt(Math.floor(Math.random() * stringValues.length));

        return randomString;
    }

    /**
    * * Función removeSSML: Mediante una expresión regular elimina todo el texto SSML y teronrna un nuevo texto.
    * @param  {String} text
    * @returns {String} newText
    */
    static removeSSML(text) {
        let newText = "";
        let regEx = new RegExp(/<[^>]*>/gi);
        newText = newText + text.replace(regEx, "");
        return newText;
    }

    /**
    * * Función removeEmoji: Mediante una expresión regular elimina todo el texto Emoji y teronrna un nuevo texto.
    * @param  {String} text
    * @returns {String} newText
    */
    static removeEmoji(text) {
        let newText = "";
        let regEx = new RegExp(/\p{Emoji}/gu);
        newText = newText + text.replace(regEx, "");
        return newText;
    }

    /**
    * * Función removeEmoji: Mediante una expresión regular elimina todo el texto Emoji y teronrna un nuevo texto.
    * @param  {String} text
    * @returns {String} newText
    */
    static removeSpecialDot(text) {
        let newText = "";
        let regEx = new RegExp(/·/g);
        newText = newText + text.replace(regEx, ",");
        return newText;
    }

    /**
    * * Función generateUUID: Genera un UUID utilizando el código de dominio público del MIT RCF4122
    * @returns {String} newText
    */
    static generateUUID() {
        var d = new Date().getTime();
        var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16;
            if(d > 0){
                r = (d + r)%16 | 0;
                d = Math.floor(d/16);
            } else {
                r = (d2 + r)%16 | 0;
                d2 = Math.floor(d2/16);
            }
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }
}

module.exports = Utils;