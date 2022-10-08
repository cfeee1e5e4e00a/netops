import { FastifyPluginCallback } from 'fastify';

import { createClient } from './createClient';
import { getConfig } from './getConfig';
import { getMyIp } from './getMyIp';

export const registerVpnRoutes: FastifyPluginCallback = (app, opts, done) => {
    app.route({
        method: 'GET',
        url: '',
        handler: getConfig,
    });

    app.route({
        method: 'POST',
        url: '/client',
        handler: createClient,
    });

    app.route({
        method: 'GET',
        url: '/my-ip',
        handler: getMyIp,
    });

    done();
};
