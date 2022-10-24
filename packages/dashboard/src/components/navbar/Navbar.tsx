import { FunctionComponent } from 'preact';
import { HeroIcon } from 'preact-heroicons';
import { Link } from 'preact-router';

export type NavbarItem = {
    displayName: string;
    url: string;
    Icon?: HeroIcon;
};

type Props = {
    items: NavbarItem[];
};

export const Navbar: FunctionComponent<Props> = ({ items }) => {
    return (
        <nav className="navbar bg-base-100 rounded-2xl shadow-lg gap-4">
            {items.map(({ displayName, Icon, url }) => (
                <Link
                    href={url}
                    className="btn btn-ghost font-normal text-xl space-x-1"
                >
                    {Icon && <Icon className="w-6 h-6" />}
                    <span>{displayName}</span>
                </Link>
            ))}
        </nav>
    );
};
