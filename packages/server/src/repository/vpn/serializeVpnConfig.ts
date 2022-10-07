import {
    AddressWithMask,
    VpnClient,
    VpnConfig,
    VpnInterface,
} from '@shared/vpn';

const serializeNetworks = (networks: AddressWithMask[]) =>
    networks.map((net, idx) =>
        networks.concat(idx !== networks.length - 1 ? net : '')
    );

const serializeInterface = ({ listenPort, networks }: VpnInterface): string =>
    '[Interface]\n'
        .concat(`Address = ${serializeNetworks(networks)}\n`)
        .concat(`ListenPort = ${listenPort}\n`)
        .concat('\n');

const serializeClient = ({
    device,
    ip,
    publicKey,
    username,
}: VpnClient): string =>
    `[Peer]\n`
        .concat(`# ${JSON.stringify({ username, device })}\n`)
        .concat(`AllowedIPs = ${ip}\n`)
        .concat(`PublicKey = ${publicKey}\n`)
        .concat('\n');

export const serializeVpnConfig = (config: VpnConfig): string =>
    serializeInterface(config.interface).concat(
        config.clients.reduce(
            (acc, client) => acc.concat(serializeClient(client)),
            ''
        )
    );
