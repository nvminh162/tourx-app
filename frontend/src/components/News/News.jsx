import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import Image from '../Image';

const News = ({ title, description, date, image, to }) => {
    const handleScrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    
    return (
        <Link
            to={to}
            onClick={handleScrollTop}
            className="select-none bg-white rounded-4xl outline-1 outline-gray-300 w-96 cursor-pointer"
        >
            <div className="pt-4 px-4 group">
                <Image
                    className="h-[216px] w-full rounded-4xl object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                    src={image}
                    alt={'news 1'}
                />
            </div>
            <div className="space-y-3 px-6 my-6">
                <h1 className="text-[18px] text-gray-600 font-bold line-clamp-2">
                    {title}
                </h1>
                <p className="text-[14px] text-gray-600 font-normal line-clamp-2">
                    {description}
                </p>
                <div className="text-[14px] text-gray-600 font-normal flex items-center">
                    {/* {new Date().toLocaleDateString('vi-VN')} */}
                    {date}
                </div>
            </div>
        </Link>
    );
};

News.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
};

export default News;
