import fastify from 'fastify';
import cors from '@fastify/cors';

import { registerVpnRoutes } from './controllers/vpn';

const app = fastify();

app.register(cors, {
    origin: '*',
});

registerVpnRoutes(app);

app.listen({ host: '10.0.0.2', port: 3001 }, (err, addr) => {
    if (err) {
        console.error('Failed to start', err);
    }

    console.log(`Started on ${addr}`);
});
