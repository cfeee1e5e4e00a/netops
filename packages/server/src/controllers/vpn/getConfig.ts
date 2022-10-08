import { readConfig } from '../../repository/vpn';

export const getConfig = async () => {
    return await readConfig();
};
