export type AddressWithMask = string;
export type PublicKey = string;

export type VpnConfig = {
    interface: VpnInterface;
    clients: VpnClient[];
};

export type VpnInterface = {
    networks: AddressWithMask[];
    publicKey: PublicKey;
    listenPort: number;
};

export type VpnClient = {
    username: string;
    device: string;
    publicKey: PublicKey;
    ip: AddressWithMask;
};
