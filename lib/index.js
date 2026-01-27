'use strict';

const HauteCouture = require('@hapipal/haute-couture');
const Package = require('../package.json');

exports.plugin = {
    pkg: Package,
    register: async (server, options) => {

        await server.register(require('@hapipal/schmervice'));

        await HauteCouture.compose(server, options);
    }
};