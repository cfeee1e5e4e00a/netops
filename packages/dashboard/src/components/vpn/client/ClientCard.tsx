import { VpnClient } from '@shared/vpn';
import { FunctionComponent } from 'preact';

type Props = {
    client: VpnClient;
};

export const ClientCard: FunctionComponent<Props> = ({ client }) => {
    return (
        <div className="p-4 rounded-lg border border-gray-200 flex flex-col justify-start items-start text-black">
            <p className="text-lg">
                <span className="font-medium">{client.username}</span>
                <span className="ml-2 font-light text-gray-400">
                    #{client.device}
                </span>
            </p>
            <p className="text-lg">
                <span className="font-medium">{client.ip}</span>
                <span className="ml-2 font-light text-gray-400">
                    {client.publicKey}
                </span>
            </p>
        </div>
    );
};
