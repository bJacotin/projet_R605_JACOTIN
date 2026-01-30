'use strict';

const Joi = require('joi');
const Jwt = require('@hapi/jwt');

module.exports = [
    {
        method: 'post',
        path: '/movie',
        options: {
            auth: {
                scope: [ 'admin' ],
            },
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    titre: Joi.string().min(3).example('Pirates des Caraïbes').description('Title of the movie'),
                    description: Joi.string().min(3).example('Petite, Elizabeth Swann, la fille du gouverneur, a sauvé de la noyade Will Turner après le naufrage de son bateau. Les années ont passé, Will et Elizabeth ont grandi. Will est devenu forgeron à Port Royal, et Elizabeth se prépare à épouser le commodore Norrington. Cependant, la vie d\'Elizabeth bascule lorsque le capitaine Barbossa et sa bande de pirates décident d\'attaquer Port Royal et la prennent en otage. Malheureusement pour lui, Barbossa a commis deux erreurs.').description('Description of the movie'),
                    dateSortie: Joi.date().example('13/08/2003').description('Password of the user'),
                    realisateur: Joi.string().example('Gore Verbinski').description('Movie maker'),
                })
            }
        },
        handler: async (request, h) => {
            const { userService } = request.services();

            return await userService.create(request.payload);
        }
    },
    {
        method: 'patch',
        path: '/movie/{id}',
        options: {
            auth: {
                scope: [ 'admin' ],
            },
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().required().description('ID of the user to delete'),
                }),
                payload: Joi.object({
                    titre: Joi.string().min(3).example('Pirates des Caraïbes').description('Title of the movie'),
                    description: Joi.string().min(3).example('Petite, Elizabeth Swann, la fille du gouverneur, a sauvé de la noyade Will Turner après le naufrage de son bateau. Les années ont passé, Will et Elizabeth ont grandi. Will est devenu forgeron à Port Royal, et Elizabeth se prépare à épouser le commodore Norrington. Cependant, la vie d\'Elizabeth bascule lorsque le capitaine Barbossa et sa bande de pirates décident d\'attaquer Port Royal et la prennent en otage. Malheureusement pour lui, Barbossa a commis deux erreurs.').description('Description of the movie'),
                    dateSortie: Joi.date().example('13/08/2003').description('Password of the user'),
                    realisateur: Joi.string().example('Gore Verbinski').description('Movie maker'),
                })
            },
            handler: async (request, h) => {
                const { userService } = request.services();

                return await userService.modify(request.params.id, request.payload);
            }
        },

    },
    {
        method: 'delete',
        path: '/movie/{id}',
        options: {
            auth: {
                scope: [ 'admin' ],
            },
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().required().description('ID of the user to delete')
                })
            }
        },
        handler: async (request, h) => {
            const { userService } = request.services();

            await userService.delete(request.params.id);

            return '';
        }
    }
];