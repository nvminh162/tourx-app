import { Link } from 'react-router-dom';

import Image from '~/components/Image/Image';
import config from '~/config';
import imgHeader from '~/assets/images/Header';
import menuItems from '~/data/mocks/layouts/Header/menuItems';
import Button from '~/components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

function Header() {
    return (
        <div className="h-[96px] w-full drop-shadow-sm bg-white fixed top-0 z-50">
            <div className="flex items-center justify-between w-full h-full mx-auto max-w-7xl">
                <div className="flex gap-10">
                    <Link to={config.routes.home}>
                        <Image
                            src={imgHeader.logoIUH}
                            alt="Logo"
                            className="w-[180px] h-[96px] object-cover select-none"
                        />
                    </Link>
                    <div className="items-center gap-5 text-base font-semibold xl:flex">
                        {menuItems.map((item) => (
                            <Link
                                to={item.to}
                                key={item.id}
                                className="select-none flex items-center justify-center h-full transition duration-300 border-b-2 border-transparent hover:border-primary-base hover:text-primary-base min-w-[80px]"
                            >
                                {item.title}
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="flex">
                    {/* TODO: Config path */}
                    <Button iconLeft={<FontAwesomeIcon icon={faPhone} shake />} href={"tel:+84353999798"} className="px-5 py-2.5 font-bold">
                        Hotline: 0353.999.798</Button>
                    <Button to="/contact" className="px-5 py-2.5" primary rounded>Liên hệ nhóm 11</Button>
                </div>
            </div>
        </div>
    );
}

export default Header;
