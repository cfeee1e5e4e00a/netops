import { writeFile } from 'fs/promises';
import { resolve } from 'path';

import { VpnConfig, VpnMaster } from '@shared/vpn';
import { stringifyInterface } from './stringifyInterface';
import { stringifyPeer } from './stringifyPeer';

const configPath = resolve(__dirname, '../../../../../../wg.conf');

export const writeConfig = async (config: VpnConfig) => {
    const master = config.peers.filter(
        ({ type }) => type === 'master'
    )[0] as VpnMaster;

    const contents = stringifyInterface(config.interface, master).concat(
        config.peers.reduce((acc, peer) => acc.concat(stringifyPeer(peer)), '')
    );

    await writeFile(configPath, contents);
};
