import { VpnInterface, VpnMaster } from '@shared/vpn';

export const stringifyInterface = (
    { privateKey, listenPort, networks, dns }: VpnInterface,
    { name }: VpnMaster
) =>
    `[Interface]\n`
        .concat(`# Node = ${name}\n`)
        .concat(`Address = ${networks.join(',')}\n`)
        .concat(`ListenPort = ${listenPort}\n`)
        .concat(`PrivateKey = ${privateKey}\n`)
        .concat(`DNS = ${dns}\n`)
        .concat('\n');
