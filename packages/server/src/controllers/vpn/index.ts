import { FastifyPluginCallback } from 'fastify';

import { createPeer } from './createPeer';
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
        url: '/peer',
        handler: createPeer,
    });

    app.route({
        method: 'GET',
        url: '/my-ip',
        handler: getMyIp,
    });

    done();
};
