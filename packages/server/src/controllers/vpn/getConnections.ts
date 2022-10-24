import { readConnections } from '../../repository/vpn';

export const getConnections = async () => {
    readConnections();
};
