import { Link } from 'react-router-dom';

import Button from '../../../components/Button/Button';

import imgFooter from '../../../assets/images/Footer';
import imgUtils from '../../../assets/images/utils';

import introduce from '../../../data/mocks/Footer/introduce.json';
import destination from '../../../data/mocks/Footer/destination.json';
import cruise from '../../../data/mocks/Footer/cruise.json';
import Image from '../../../components/Image';

const Footer = () => {
    const handleScrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="select-none">
            <div className="w-full text-white bg-gray-900">
                {/* footer 1 */}
                <div className="grid grid-cols-1 lg:grid-cols-6 max-w-7xl lg:gap-15 mx-auto py-16 lg:space-y-0 space-y-10">
                    {/* Item 1 */}
                    <div className="flex flex-col col-span-2 space-y-6 items-center lg:items-start text-center lg:text-left mx-5">
                        {' '}
                        {/*Sub Item 1 */}
                        <Image className="object-cover h-20 w-55" src={imgUtils.logoTourX} />
                        <p>Công ty TNHH Du Lịch và Dịch Vụ Tour Explore - TourX</p>
                        <p>12 Nguyễn Văn Bảo, Phường 1, Quận Gò Vấp, Thành phố Hồ Chí Minh</p>
                        <p>
                            Mã số doanh nghiệp: 0353999798 do Sở Kế hoạch và Đầu tư Thành phố Hồ Chí Minh cấp ngày
                            23/02/2025
                        </p>
                    </div>
                    {/* Item 2 */}
                    <div className="col-span-4">
                        {/*Sub Item 2 */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mx-10 lg:mx-0 text-base">
                            <div className="flex flex-col space-y-4">
                                <h3 className="uppercase text-[14px] font-sans text-gray-500">Giới thiệu</h3>
                                <>
                                    {introduce.map((item) => {
                                        let href = item.to;
                                        if (item.type === 'phone') {
                                            href = `tel:${item.to}`;
                                        } else if (item.type === 'email') {
                                            href = `mailto:${item.to}`;
                                        }

                                        return item.type === 'navigation' ? (
                                            <Link
                                                onClick={handleScrollTop}
                                                key={item.id}
                                                className="text-base font-bold text-gray-400 hover:text-primary-base"
                                                to={item.to}
                                            >
                                                {item.title}
                                            </Link>
                                        ) : (
                                            <a
                                                key={item.id}
                                                href={href}
                                                className="text-base font-bold text-gray-400 hover:text-primary-base"
                                            >
                                                {item.title}
                                            </a>
                                        );
                                    })}
                                </>
                            </div>
                            <div className="flex flex-col space-y-4">
                                <h3 className="uppercase text-[14px] font-sans text-gray-500">Điểm đến</h3>
                                <>
                                    {destination.map((item) => {
                                        let href = item.to;
                                        if (item.type === 'phone') {
                                            href = `tel:${item.to}`;
                                        } else if (item.type === 'email') {
                                            href = `mailto:${item.to}`;
                                        }

                                        return item.type === 'navigation' ? (
                                            <Link
                                                onClick={handleScrollTop}
                                                key={item.id}
                                                className="text-base font-bold text-gray-400 hover:text-primary-base"
                                                to={item.to}
                                            >
                                                {item.title}
                                            </Link>
                                        ) : (
                                            <a
                                                key={item.id}
                                                href={href}
                                                className="text-base font-bold text-gray-400 hover:text-primary-base"
                                            >
                                                {item.title}
                                            </a>
                                        );
                                    })}
                                </>
                            </div>
                            <div className="flex flex-col space-y-4">
                                <h3 className="uppercase text-[14px] font-sans text-gray-500">Du thuyền</h3>
                                <>
                                    {cruise.map((item) => {
                                        let href = item.to;
                                        if (item.type === 'phone') {
                                            href = `tel:${item.to}`;
                                        } else if (item.type === 'email') {
                                            href = `mailto:${item.to}`;
                                        }

                                        return item.type === 'navigation' ? (
                                            <Link
                                                onClick={handleScrollTop}
                                                key={item.id}
                                                className="text-base font-bold text-gray-400 hover:text-primary-base"
                                                to={item.to}
                                            >
                                                {item.title}
                                            </Link>
                                        ) : (
                                            <a
                                                key={item.id}
                                                href={href}
                                                className="text-base font-bold text-gray-400 hover:text-primary-base"
                                            >
                                                {item.title}
                                            </a>
                                        );
                                    })}
                                </>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* footer 2 */}
            <div className="bg-gray-800 text-gray-400">
                <div className="flex flex-col-reverse items-center justify-between py-8 mx-auto text-base md:flex-row max-w-7xl">
                    <div className="m-2">© 2025 Tour Explore Group - TourX Group, Inc. All rights reserved.</div>
                    <div className="flex flex-col md:flex-row gap-5 m-2">
                        <Button href="https://iuh.edu.vn/">
                            <Image className="object-cover h-15 w-40" src={imgUtils.logoIUHWhite} />
                        </Button>
                        <Image className="object-cover h-15 w-40" src={imgFooter.verify} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
