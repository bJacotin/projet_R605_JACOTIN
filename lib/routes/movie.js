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
                    titre: Joi.string().min(3).example('Pirates des Caraibes').description('Title of the movie'),
                    description: Joi.string().min(3).example('Elizabeth Swann fille du gouverneur ...').description('Description of the movie'),
                    dateSortie: Joi.date().example('2003-08-13').description('Date of release'),
                    realisateur: Joi.string().example('Gore Verbinski').description('Movie maker'),
                })
            }
        },
        handler: async (request, h) => {
            const { movieService } = request.services();

            return await movieService.create(request.payload);
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
                    titre: Joi.string().min(3).example('Pirates des Caraibes').description('Title of the movie'),
                    description: Joi.string().min(3).example('Elizabeth Swann fille du gouverneur ...').description('Description of the movie'),
                    dateSortie: Joi.date().example('2003-08-13').description('Date of release'),
                    realisateur: Joi.string().example('Gore Verbinski').description('Movie maker'),
                })
            },
            handler: async (request, h) => {
                const { movieService } = request.services();

                return await movieService.modify(request.params.id, request.payload);
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
                    id: Joi.number().integer().required().description('ID of the movie to delete')
                })
            }
        },
        handler: async (request, h) => {
            const { movieService } = request.services();

            await movieService.delete(request.params.id);

            return '';
        }
    },
    {
        method: 'get',
        path: '/movies',
        options: {
            auth: {
                scope: [ 'user', 'admin' ],
            },
            tags: ['api'],
        },
        handler: async (request, h) => {
            const { movieService } = request.services();

            return await movieService.list();
        }
    },
];