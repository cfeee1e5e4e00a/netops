export type IPWithMask = string;
export type IPWithPort = string;
export type IP = string;

export type VpnStatus = Record<string, VpnPeerStatus>;

export type VpnPeerStatus = {
    endpoint: IPWithPort;
    lastHandshake: number;
    transferRx: number;
    transferTx: number;
};

// export type VpnPeerConnectionSta

export type VpnConfig = {
    interface: VpnInterface;
    peers: VpnPeer[];
};

export type VpnInterface = {
    networks: IPWithMask[];
    listenPort: number;
    publicKey: string;
    privateKey: string;
    dns: IP;
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
