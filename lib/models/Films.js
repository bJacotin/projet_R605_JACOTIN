'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');
const myEncrypt = require('../modules/pwd_encrypt');

module.exports = class Films extends Model {

    static get tableName() {

        return 'Films';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            titre: Joi.string().min(3).example('Pirates des Caraïbes').description('Title of the movie'),
            description: Joi.string().min(3).example('Petite, Elizabeth Swann, la fille du gouverneur, a sauvé de la noyade Will Turner après le naufrage de son bateau. Les années ont passé, Will et Elizabeth ont grandi. Will est devenu forgeron à Port Royal, et Elizabeth se prépare à épouser le commodore Norrington. Cependant, la vie d\'Elizabeth bascule lorsque le capitaine Barbossa et sa bande de pirates décident d\'attaquer Port Royal et la prennent en otage. Malheureusement pour lui, Barbossa a commis deux erreurs.').description('Description of the movie'),
            dateSortie: Joi.date().example('13/08/2003').description('Password of the user'),
            realisateur: Joi.string().example('Gore Verbinski').description('Movie maker'),
            createdAt: Joi.date(),
            updatedAt: Joi.date()
        });
    }

    async $beforeInsert(queryContext) {
        this.updatedAt = new Date();
        this.createdAt = this.updatedAt;
    }

    $beforeUpdate(opt, queryContext) {
        this.updatedAt = new Date();
    }

};