import { readConfig, writeConfig } from '../../repository/vpn';

export const createClient = async () => {
    const config = await readConfig();
    await writeConfig(config);
};
