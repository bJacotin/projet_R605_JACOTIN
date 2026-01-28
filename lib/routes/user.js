'use strict';

const Joi = require('joi');

module.exports = [
    {
        method: 'post',
        path: '/user',
        options: {
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    firstName: Joi.string().required().min(3).example('John').description('Firstname of the user'),
                    lastName: Joi.string().required().min(3).example('Doe').description('Lastname of the user')
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
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    password: Joi.string().email().min(8).required(),
                    mail: Joi.string().min(8).required(),
                })
            }
        },
        handler: async (request, h) => {
            const { userService } = request.services();
            const { mail, password } = request.payload;

            const user = await userService.login(mail, password);

            if (!user){
                return h.response({ message: 'Email ou mot de passe invalide'}).code(401);
            }

            return { login: 'successful', user};
        }
    },
    {
          method: 'patch',
          path: '/user/{id}',
          options: {
              tags: ['api'],
              validate: {
                  params: Joi.object({
                      id: Joi.number().integer().required().description('ID of the user to delete'),
                  }),
                  payload: Joi.object({
                      firstName: Joi.string().min(3).example('John'),
                      lastName: Joi.string().min(3).example('Doe'),
                      password: Joi.string().min(8).example('B@nj0ur777!'),
                      mail: Joi.string().min(8).example('john.doe@gmail.com'),
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