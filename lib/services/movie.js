'use strict';

const { Service } = require('@hapipal/schmervice');

module.exports = class UserService extends Service {

    create(movie){

        const { Movie } = this.server.models();

        return Movie.query().insertAndFetch(movie);
    }
}
