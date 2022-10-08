import { FastifyRequest } from 'fastify';
import { match } from 'ts-pattern';

import { VpnNode, VpnUser } from '@shared/vpn';
import { readConfig, writeConfig } from '../../repository/vpn';

type DTO = NodeDTO | UserDTO;

type NodeDTO = {
    type: 'node';
    name: string;
    publicKey: string;
};

type UserDTO = {
    type: 'user';
    name: string;
    device: string;
    publicKey: string;
};

export const createPeer = async (req: FastifyRequest) => {
    const config = await readConfig();

    const lastIp = config.peers[config.peers.length - 1].ip.split('.');
    const nextLastOctet = String(Number(lastIp[3]) + 1);
    const ip = [...lastIp.slice(0, 3), nextLastOctet].join('.');

    const peer = match<DTO, VpnUser | VpnNode>(req.body as DTO)
        .with({ type: 'node' }, ({ type, name, publicKey }) => ({
            type,
            name,
            ip,
            publicKey,
        }))
        .with({ type: 'user' }, ({ type, name, device, publicKey }) => ({
            type,
            name,
            device,
            ip,
            publicKey,
        }))
        .exhaustive();

    config.peers.push(peer);

    await writeConfig(config);
};
