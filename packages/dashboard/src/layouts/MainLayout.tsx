import { FunctionalComponent } from 'preact';
import { LockClosedOutline } from 'preact-heroicons';

import { Navbar } from '@/components/navbar';
import { NavbarItemProps } from '@/components/navbar/NavbarItem';

const routes: NavbarItemProps[] = [
    {
        displayName: 'VPN',
        Icon: LockClosedOutline,
        url: '/vpn',
        active: true,
    },
];

export const MainLayout: FunctionalComponent = ({ children }) => {
    return (
        <div className="w-full h-full">
            <Navbar items={routes} />
            {children}
        </div>
    );
};
