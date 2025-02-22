import { Link } from 'react-router-dom';

import Image from '~/components/Image/Image';
import config from '~/config';
import imgHeader from '~/assets/images/Header';
import menuItems from '~/data/mocks/layouts/Header/menuItems';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCaretDown, faGlobe, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="h-[96px] w-full drop-shadow-sm bg-white fixed top-0 z-50">
            <div
                className="flex items-center justify-between w-full h-full mx-auto max-w-7xl"
                onMouseLeave={() => setIsMenuOpen(false)}
                onMouseDown={() => setIsMenuOpen(false)}
            >
                <div className="flex gap-5 mx-5">
                    <Link to={config.routes.home}>
                        <Image
                            src={imgHeader.logoTourX}
                            alt="Logo"
                            className="w-[130px] h-[96px] object-cover select-none"
                        />
                    </Link>
                    <div className="items-center gap-5 text-base font-semibold hidden lg:flex">
                        {menuItems.map((item) => (
                            <Link
                                to={item.to}
                                key={item.id}
                                className="select-none text-center flex items-center justify-center h-full transition duration-300 border-b-2 border-transparent hover:border-primary-base hover:text-primary-base min-w-[80px]"
                            >
                                {item.title}
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="relative flex items-center justify-center gap-6 mx-5">
                    <Link to={config.routes.search} className="text-2xl cursor-pointer">
                        <FontAwesomeIcon icon={faMagnifyingGlass} fade />
                    </Link >
                    <button className="text-2xl cursor-pointer">
                        <FontAwesomeIcon icon={faUser} />
                    </button>
                    <button className="text-2xl cursor-pointer hidden lg:block">
                        <FontAwesomeIcon icon={faGlobe} />
                        <FontAwesomeIcon className="ml-1.5 text-xl" icon={faCaretDown} />
                    </button>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-3xl lg:hidden cursor-pointer">
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                </div>
                <div
                    className={`shadow-2xl border-t-1 border-t-gray-300 absolute gap-3 xl:hidden top-24 left-0 w-full bg-white flex flex-col items-center font-semibold text-lg transform transition-transform ${
                        isMenuOpen ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{ transition: 'transform 0.3s ease, opacity 0.3s ease' }}
                >
                    {menuItems.map((item) => (
                        <Link
                            to={item.to}
                            key={item.id}
                            className=" w-full text-center p-4 hover:bg-primary-base hover:text-black"
                        >
                            {item.title}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Header;
