'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');
const myEncrypt = require('../modules/pwd_encrypt');

module.exports = class User extends Model {

    static get tableName() {

        return 'User';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            firstName: Joi.string().min(3).example('John').description('Firstname of the user'),
            lastName: Joi.string().min(3).example('Doe').description('Lastname of the user'),
            password: Joi.string().min(8).example('B@nj0ur777!').description('Password of the user'),
            mail: Joi.string().min(8).example('john.doe@gmail.com').description('Email of the user'),
            username: Joi.string().min(5).example('TheJohnDoe78').description('Username of the user'),
            createdAt: Joi.date(),
            updatedAt: Joi.date()
        });
    }

    async $beforeInsert(queryContext) {

        this.updatedAt = new Date();
        this.createdAt = this.updatedAt;
        this.password = await myEncrypt.hashPassword(this.password);
    }

    $beforeUpdate(opt, queryContext) {

        this.updatedAt = new Date();
    }

};