import { FunctionalComponent } from 'preact';
import { LockClosedOutline } from 'preact-heroicons';

import { Navbar, NavbarItem } from '@/components/navbar';

const routes: NavbarItem[] = [
    {
        displayName: 'Netops',
        url: '/',
    },
    {
        displayName: 'VPN',
        Icon: LockClosedOutline,
        url: '/vpn',
    },
];

export const MainLayout: FunctionalComponent = ({ children }) => {
    return (
        <div className="p-8 space-y-8 w-full h-full bg-gray-100">
            <Navbar items={routes} />
            {children}
        </div>
    );
};
