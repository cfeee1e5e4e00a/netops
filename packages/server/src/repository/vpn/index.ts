import { resolve } from 'path';
import { readFile, writeFile } from 'fs/promises';

import { AddressWithMask, VpnClient, VpnConfig } from '@shared/vpn';
import { parseVpnConfig } from './parseVpnConfig';
import { serializeVpnConfig } from './serializeVpnConfig';

const configPath = resolve(__dirname, '../../../../../wg.conf');
const publicKeyPath = resolve(__dirname, '../../../../../publickey');

export const getConfig = async (): Promise<VpnConfig> => {
    const publicKey = (await readFile(publicKeyPath)).toString();
    const contents = (await readFile(configPath)).toString();
    const configFromFile = parseVpnConfig(contents);

    return {
        interface: {
            publicKey,
            ...configFromFile.interface,
        },
        clients: configFromFile.clients,
    };
};

const lastOctetRE = /\.(?<ip>[0-9]{1,3})\//g;

const increaseIp = (clients: VpnConfig['clients']): AddressWithMask => {
    const lastClient = Object.values(clients)[clients.length - 1];

    const lastOctet = Number(
        [...lastClient.ip.matchAll(lastOctetRE)][0].groups!.ip
    );

    return lastClient.ip.replace(lastOctetRE, `.${lastOctet + 1}/`);
};

export const addClient = async (
    dto: Omit<VpnClient, 'ip'>
): Promise<VpnClient> => {
    const config = await getConfig();
    const ip = increaseIp(config.clients);

    const client: VpnClient = {
        ip,
        ...dto,
    };

    config.clients.push(client);
    await writeFile(configPath, serializeVpnConfig(config));

    return client;
};
