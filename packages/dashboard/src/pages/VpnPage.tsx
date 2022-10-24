import { VpnConfig } from '@shared/vpn';
import { useFetch } from '@/hooks/useFetch';
import { FunctionalComponent } from 'preact';

export const VpnPage: FunctionalComponent = () => {
    const config = useFetch<VpnConfig>('/api/vpn');

    if (!config) {
        return <h1>Загрузка</h1>;
    }

    return <h1>Vpn</h1>;
};
