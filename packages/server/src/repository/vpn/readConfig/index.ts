/**
 * Спасибо @leadpogrommer за помощь с парсингом
 */
import { resolve } from 'path';
import { partition } from 'fp-ts/lib/Array';
import { readFile } from 'fs/promises';

import { VpnConfig, VpnMaster } from '@shared/vpn';
import { readPublicKey } from './readPublicKey';
import { parseInterfaceBlock } from './parseInterfaceBlock';
import { parsePeerBlock } from './parsePeerBlock';
import { parseIpWithMask } from '../../../utils/parseIpWithMask';

const INTERFACE_ANCHOR = 'Interface';
const configPath = resolve(__dirname, '../../../../../../wg.conf');
const blockRE = /\[(?<name>[^\]]*)]\n(?<contents>[^[]*)/gm;

const isInterfaceBlock = (block: RegExpMatchArray) =>
    block.groups!.name! === INTERFACE_ANCHOR;

export const readConfig = async (): Promise<VpnConfig> => {
    const contents = (await readFile(configPath)).toString();

    const blocks = [...contents.matchAll(blockRE)];

    const { left: peerBlocks, right: interfaceBlock } =
        partition(isInterfaceBlock)(blocks);

    const peers = peerBlocks.map((match) =>
        parsePeerBlock(match.groups!.contents!)
    );

    const [_interface, masterName] = parseInterfaceBlock(
        interfaceBlock[0].groups!.contents!
    );

    const masterPublicKey = await readPublicKey();

    const master: VpnMaster = {
        type: 'master',
        name: masterName,
        ip: parseIpWithMask(_interface.networks[0]).ip,
        publicKey: masterPublicKey,
    };

    return {
        interface: {
            publicKey: masterPublicKey,
            ..._interface,
        },
        peers: [master, ...peers],
    };
};
