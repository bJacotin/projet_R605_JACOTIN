'use strict';

const Joi = require('joi');
const Jwt = require('@hapi/jwt');

module.exports = [
    {
        method: 'post',
        path: '/user',
        options: {
            auth: false,
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    firstName: Joi.string().required().min(3).example('John').description('Firstname of the user'),
                    lastName: Joi.string().required().min(3).example('Doe').description('Lastname of the user'),
                    username: Joi.string().min(5).example('TheJohnDoe78').description('Username of the user'),
                    password: Joi.string().min(8).example('B@nj0ur777!').description('Password of the user'),
                    email: Joi.string().email().min(8).example('john.doe@gmail.com').description('Email of the user'),
                })
            }
        },
        handler: async (request, h) => {
            const { userService } = request.services();

            return await userService.create(request.payload);
        }
    },
    {
        method: 'post',
        path: '/user/login',
        options: {
            auth: false,
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    password: Joi.string().min(8).required(),
                    email: Joi.string().email().min(8).required(),
                })
            }
        },
        handler: async (request, h) => {
            const { userService } = request.services();
            const { email, password } = request.payload;

            const user = await userService.login(email, password);

            if (!user){
                return h.response({ message: 'Email ou mot de passe invalide'}).code(401);
            }

            const token = Jwt.token.generate(
                {
                    aud: 'urn:audience:iut',
                    iss: 'urn:issuer:iut',
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    scope: user.scope
                },
                {
                    key: 'random_string',
                    algorithm: 'HS512'
                },
                {
                    ttlSec: 14400
                }
            );

            return { login: 'successful', user, token};
        }
    },
    {
          method: 'patch',
          path: '/user/{id}',
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
                      firstName: Joi.string().min(3).example('John'),
                      lastName: Joi.string().min(3).example('Doe'),
                      password: Joi.string().min(8).example('B@nj0ur777!'),
                      email: Joi.string().min(8).example('john.doe@gmail.com'),
                      username: Joi.string().min(5).example('TheJohnDoe78'),
                  })
              },
              handler: async (request, h) => {
                  const { userService } = request.services();

                  return await userService.modify(request.params.id, request.payload);
              }
          },

    },
    {
        method: 'get',
        path: '/users',
        options: {
            auth: {
                scope: [ 'user', 'admin' ],
            },
            tags: ['api'],
        },
        handler: async (request, h) => {
            const { userService } = request.services();

            return await userService.list();
        }
    },
    {
        method: 'delete',
        path: '/user/{id}',
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