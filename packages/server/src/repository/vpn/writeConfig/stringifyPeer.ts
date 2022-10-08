import { VpnPeer } from '@shared/vpn';
import { match } from 'ts-pattern';

export const stringifyPeer = (peer: VpnPeer) =>
    match(peer)
        .with({ type: 'master' }, () => '')
        .with({ type: 'node' }, ({ name, publicKey, ip }) =>
            `[Peer]\n`
                .concat(`# Node = ${name}\n`)
                .concat(`PublicKey = ${publicKey}\n`)
                .concat(`AllowedIPs = ${ip}/32\n`)
                .concat('\n')
        )
        .with({ type: 'user' }, ({ name, device, publicKey, ip }) =>
            `[Peer]\n`
                .concat(`# Name = ${name}\n`)
                .concat(`# Device = ${device}\n`)
                .concat(`PublicKey = ${publicKey}\n`)
                .concat(`AllowedIPs = ${ip}/32\n`)
                .concat('\n')
        )
        .exhaustive();
