export * from './readConfig';
export * from './writeConfig';

// const lastOctetRE = /\.(?<ip>[0-9]{1,3})\//g;

// const increaseIp = (clients: VpnConfig['clients']): IPWithMask => {
//     const lastClient = Object.values(clients)[clients.length - 1];

//     const lastOctet = Number(
//         [...lastClient.ip.matchAll(lastOctetRE)][0].groups!.ip
//     );

//     return lastClient.ip.replace(lastOctetRE, `.${lastOctet + 1}/`);
// };

// export const addClient = async (dto: Omit<VpnPeer, 'ip'>): Promise<VpnPeer> => {
//     const config = await getConfig();
//     const ip = increaseIp(config.clients);

//     const client: VpnPeer = {
//         ip,
//         ...dto,
//     };

//     config.clients.push(client);
//     await writeFile(configPath, serializeVpnConfig(config));

//     return client;
// };
