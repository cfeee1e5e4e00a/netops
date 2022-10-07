import { VpnClient, VpnConfig, VpnInterface } from '@shared/vpn';

type WgInterfaceBlock = {
    Address: string;
    ListenPort: string;
};

type WgPeerBlock = {
    PublicKey: VpnClient['publicKey'];
    AllowedIPs: VpnClient['ip'];
};

type WgUserData = Pick<VpnClient, 'username' | 'device'>;

type VpnPeer = Pick<VpnClient, 'publicKey' | 'ip'>;

type VpnInterfaceFromFile = Omit<VpnInterface, 'publicKey'>;

type VpnConfigFromFile = Omit<VpnConfig, 'interface'> & {
    interface: VpnInterfaceFromFile;
};

const INTERFACE_ANCHOR = 'Interface';
const PEER_ANCHOR = 'Peer';

/**
 * Спасибо @leadpogrommer за помощь с парсингом
 */

const blockRE = /\[(?<name>[^\]]*)]\n(?<content>[^[]*)/gm;
const assignmentRE = /(?<key>[^\s=]*)\s*=\s*(?<value>.*)/gm;
const jsonCommentRE = /#\s(?<json>.*)/gm;
const ipWithMaskRE =
    /([0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}\/[0-9]{1,2})/gm;

export const parseVpnConfig = (contents: string): VpnConfigFromFile =>
    // @ts-ignore
    [...contents.matchAll(blockRE)].reduce((config, { groups }) => {
        if (groups!.name === INTERFACE_ANCHOR) {
            return {
                ...config,
                interface: parseInterface(groups!.content),
            };
        }

        if (groups!.name === PEER_ANCHOR) {
            return {
                ...config,
                clients: [
                    ...(config.clients ?? []),
                    parsePeer(groups!.content),
                ],
            };
        }
    }, {} as VpnConfigFromFile);

const parseInterface = (block: string): VpnInterfaceFromFile =>
    mapWgInterface(parseAssignments<WgInterfaceBlock>(block));

const mapWgInterface = ({
    Address,
    ListenPort,
}: WgInterfaceBlock): VpnInterfaceFromFile => ({
    listenPort: Number(ListenPort),
    networks: Address.match(ipWithMaskRE)!,
});

const parsePeer = (block: string): VpnClient => {
    const peer = mapWgPeer(parseAssignments<WgPeerBlock>(block));
    const userData: WgUserData = parseJsonComment(block);

    return { ...peer, ...userData };
};

const mapWgPeer = ({ AllowedIPs, PublicKey }: WgPeerBlock): VpnPeer => ({
    ip: AllowedIPs,
    publicKey: PublicKey,
});

const parseAssignments = <T>(block: string) =>
    [...block.matchAll(assignmentRE)].reduce(
        (acc, { groups }) => ({
            ...acc,
            [groups!.key]: groups!.value,
        }),
        {} as T
    );

const parseJsonComment = (block: string) =>
    JSON.parse([...block.matchAll(jsonCommentRE)][0].groups?.json!);
