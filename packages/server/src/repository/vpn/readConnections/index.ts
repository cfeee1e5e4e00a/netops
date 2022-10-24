import { IPWithMask, IPWithPort } from '@shared/vpn';

const stub = `{
	"wg0": {
		"privateKey": "gOXN9wMMdhSigNky5yj3Ef2G+JG3AiMc89OYtgNc7HQ=",
		"publicKey": "DjQz3sBrT6MNxfBqYSrtm2hKoX9+hxj0+AxuPBokeHo=",
		"listenPort": 51820,
		"peers": {
			"TPC+ujGNVVE5FWeW8zHSLY6sXQPt92B85zJ2DYBCBWY=": {
				"presharedKey": "(none)",
				"endpoint": "85.118.228.220:36529",
				"latestHandshake": 1665208050,
				"transferRx": 57036920,
				"transferTx": 197320440,
				"allowedIps": [
					"10.0.0.2/32"
				]
			},
			"sV9hXavLTbePKIkFqoQR0qjS2QGvtCxJEyE3XF2inAA=": {
				"presharedKey": "(none)",
				"endpoint": "217.21.212.163:62951",
				"latestHandshake": 1665208144,
				"transferRx": 10536276,
				"transferTx": 10964360,
				"allowedIps": [
					"10.0.0.4/32"
				]
			},
			"KNFhM8FacYb3pfYmu7gpKZapcobLeipOPj6iAw7W6ng=": {
				"presharedKey": "(none)",
				"allowedIps": [
					"10.0.0.5/32"
				]
			}
		}
	}
}`;

type WgDump = Record<string, WgDumpInterface>;

type WgDumpPeer = {
    presharedKey: string;
    allowedIps: IPWithMask[];
    endpoint?: IPWithPort;
    latestHandshake?: string;
    transferRx?: string;
    transferTx?: string;
};

type WgDumpInterface = {
    privateKey: string;
    publicKey: string;
    listenPort: string;
    peers: Record<string, WgDumpPeer>;
};

export const readConnections = () => {
    const dump: WgDump = JSON.parse(stub);

    Object.entries(dump.wg0.peers).forEach(([publicKey, peer]) => {
        console.log(
            `[${publicKey}] ${
                peer.endpoint !== undefined
                    ? `online ${peer.allowedIps[0]} <- ${peer.endpoint}`
                    : 'offline'
            }`
        );
    });
};
