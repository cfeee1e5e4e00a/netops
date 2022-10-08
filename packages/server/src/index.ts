import fastify from 'fastify';
import cors from '@fastify/cors';

import { registerVpnRoutes } from './controllers/vpn';

const app = fastify();

app.register(cors, {
    origin: '*',
});

app.register(registerVpnRoutes, { prefix: '/api/vpn' });

app.listen({ host: '0.0.0.0', port: 3001 }, (err, addr) => {
    if (err) {
        console.error('Failed to start\n', err);
    }

    console.log(`Started on ${addr}`);
});
