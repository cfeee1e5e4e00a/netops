import { match, P } from 'ts-pattern';

import { VpnNode, VpnUser } from '@shared/vpn';
import { parseAssignments } from './parseAssignments';
import { parseIpWithMask } from '../../../utils/parseIpWithMask';

type VpnPeerBlock = VpnUser | VpnNode;

type WgPeerBlock = WgUserBlock | WgNodeBlock;

type WgNodeBlock = {
    Node: string;
    PublicKey: string;
    AllowedIPs: string;
};

type WgUserBlock = {
    Name: string;
    Device: string;
    PublicKey: string;
    AllowedIPs: string;
};

export const parsePeerBlock = (block: string): VpnPeerBlock => {
    const assignments = parseAssignments<WgPeerBlock>(block);

    return match<WgPeerBlock, VpnPeerBlock>(assignments)
        .with({ Name: P.string }, (user) => ({
            type: 'user',
            name: user.Name,
            device: user.Device,
            ip: parseIpWithMask(user.AllowedIPs).ip,
            publicKey: user.PublicKey,
        }))
        .with({ Node: P.string }, (node) => ({
            type: 'node',
            name: node.Node,
            ip: parseIpWithMask(node.AllowedIPs).ip,
            publicKey: node.PublicKey,
        }))
        .exhaustive();
};
