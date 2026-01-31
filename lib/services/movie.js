'use strict';

const { Service } = require('@hapipal/schmervice');

module.exports = class MovieService extends Service {

    async create(movie){
        const { Movie } = this.server.models();
        return await Movie.query().insertAndFetch(movie);
    }

    async modify(id, movie){
        const { Movie } = this.server.models();
        return Movie.query().patchAndFetchById(id, movie);
    }

    async delete(id){
        const { Movie } = this.server.models();
        return Movie.query().deleteById(id);
    }

    async list() {
        const { Movie } = this.server.models();
        return Movie.query();
    }
}
