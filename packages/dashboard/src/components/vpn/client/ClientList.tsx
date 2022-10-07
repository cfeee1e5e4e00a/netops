import { VpnClient } from '@shared/vpn';
import { FunctionComponent } from 'preact';
import { ClientCard } from './ClientCard';

export type Props = {
    clients: VpnClient[];
};

export const ClientList: FunctionComponent<Props> = ({ clients }) => {
    return (
        <div className="flex flex-col gap-4">
            {clients.map((client) => (
                <ClientCard client={client} key={client.publicKey} />
            ))}
        </div>
    );
};
