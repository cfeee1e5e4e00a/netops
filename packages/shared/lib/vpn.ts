export type IPWithMask = string;
export type IP = string;

export type VpnConfig = {
    interface: VpnInterface;
    peers: VpnPeer[];
};

export type VpnInterface = {
    networks: IPWithMask[];
    listenPort: number;
    publicKey: string;
    privateKey: string;
    dns: string;
};

export type VpnPeer = VpnMaster | VpnNode | VpnUser;

export type VpnMaster = {
    type: 'master';
    name: string;
    publicKey: string;
    ip: IP;
};

export type VpnNode = {
    type: 'node';
    name: string;
    publicKey: string;
    ip: IP;
};

export type VpnUser = {
    type: 'user';
    name: string;
    device: string;
    publicKey: string;
    ip: IP;
};
