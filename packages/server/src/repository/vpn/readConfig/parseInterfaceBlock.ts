import { IPWithMask, VpnInterface } from '@shared/vpn';
import { parseAssignments } from './parseAssignments';

type WgInterfaceBlock = {
    Node: string;
    Address: string;
    ListenPort: string;
    PrivateKey: string;
    DNS: string;
};

type VpnInterfaceBlock = Omit<VpnInterface, 'publicKey'>;

const parseListenPort = Number;
const parseNetworks = (networks: string): IPWithMask[] => networks.split(',');

export const parseInterfaceBlock = (
    block: string
): [VpnInterfaceBlock, string] => {
    const assignments = parseAssignments<WgInterfaceBlock>(block);

    return [
        {
            listenPort: parseListenPort(assignments.ListenPort),
            networks: parseNetworks(assignments.Address),
            privateKey: assignments.PrivateKey,
            dns: assignments.DNS,
        },
        assignments.Node,
    ];
};
