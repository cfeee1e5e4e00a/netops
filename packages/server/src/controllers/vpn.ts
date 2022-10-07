import { FastifyInstance } from 'fastify';

import * as Vpn from '../repository/vpn';
import { VpnClient } from '@shared/vpn';

export const registerVpnRoutes = (app: FastifyInstance) => {
    app.route({
        method: 'GET',
        url: '/api/vpn',
        handler: async (req, res) => {
            const config = await Vpn.getConfig();
            return res.send(config);
        },
    });

    app.route({
        method: 'POST',
        url: '/api/vpn/client',
        handler: async (req, res) => {
            const client = await Vpn.addClient(
                req.body as Omit<VpnClient, 'ip'>
            );
            return client;
        },
    });

    app.route({
        method: 'GET',
        url: '/api/vpn/my-ip',
        handler: async ({ ip }, res) => {
            return { ip };
        },
    });
};
