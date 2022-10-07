import { FunctionComponent } from 'preact';
import { route } from 'preact-router';
import { HeroIcon } from 'preact-heroicons';
import clsx from 'clsx';

export type NavbarItemProps = {
    displayName: string;
    Icon: HeroIcon;
    url: string;
    active: boolean;
};

export const NavbarItem: FunctionComponent<NavbarItemProps> = ({
    displayName,
    Icon,
    url,
    active,
}) => {
    return (
        <li
            onClick={() => route(url)}
            className="w-min h-full flex flex-row justify-end cursor-pointer gap-2"
        >
            <span
                className={clsx('text-2xl', {
                    ['font-medium']: active,
                })}
            >
                {displayName}
            </span>
            <Icon className="w-8 h-8" />
        </li>
    );
};
