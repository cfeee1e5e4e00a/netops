import { FunctionComponent } from 'preact';
import { NavbarItem, NavbarItemProps } from './NavbarItem';

type Props = {
    items: NavbarItemProps[];
};

export const Navbar: FunctionComponent<Props> = ({ items }) => {
    return (
        <nav className="border-b border-gray-200 w-full flex flex-row items-center justify-start">
            <h1 className="py-4 px-8 mr-4 text-4xl">Netops</h1>
            <div className="w-full h-full">
                {items.map((item) => (
                    <NavbarItem {...item} key={item.url} />
                ))}
            </div>
        </nav>
    );
};
