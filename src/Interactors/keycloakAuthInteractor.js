'use strict'

//Constantes de VIP.
const libraries = require('../Base/libraries');

/**
 * * Función getAccessToken: Encargada de obtener el Token JWT de eva.
 * @returns {String} access_token 
 */
async function getAccessToken() {
    return new Promise(async (resolve, reject) => {
        var data = libraries.qs.stringify({
            'client_id': 'eva-api',
            'username': process.env.username,
            'password': process.env.password,
            'grant_type': 'password'
        });
        var config = {
            method: 'post',
            url: process.env.urlAuth,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'apiKey': process.env.apiKey,
                'project': 'testJ',
                'channel': 'ALL',
                'test': 'false',
                'operatingSystem': 'Windows',
                'userRef': 'chatdemo',
                'locale': 'en-US'
            },
            data: data
        };
        libraries.axios(config)
            .then(function (response) {
                console.VIPLog('getAccessToken response: %j', JSON.stringify(response.data))
                resolve(response.data.access_token);
            })
            .catch(function (error) {
                console.VIPLog(error);
                reject(error);
            });
    });
}
module.exports.getAccessToken = getAccessToken;