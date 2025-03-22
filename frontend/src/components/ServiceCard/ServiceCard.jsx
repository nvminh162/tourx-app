import PropTypes from 'prop-types';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faBed, faMapLocationDot, faShip } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';

const ServiceCard = ({ category, name, location, details, originalPrice, price, image, rating, to }) => {
    const handleScrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    const unit = category === 'cruise' ? 'khách' : category === 'hotel' ? 'phòng' : 'chuyến';

    return (
        <Link to={to} onClick={handleScrollTop} className="select-none bg-white rounded-4xl outline-1 outline-gray-300 w-96 cursor-pointer">
            <div className="pt-4 px-4">
                <div className="relative group">
                    <img className="h-[216px] w-full rounded-4xl object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" src={image} alt={name} />
                    <span className="absolute top-0 left-0 bg-warning-light py-1 px-2 rounded-full text-warning-dark text-xs font-semibold m-3">
                        <FontAwesomeIcon className="mr-1 text-warning-base" icon={faStar} />
                        <span className="mr-1">{parseFloat(rating.score).toFixed(1)}</span>
                        <span className="mr-1">({rating.count})</span>
                        <span>đánh giá</span>
                    </span>
                </div>
            </div>
            <div className="space-y-3 px-6 mt-5">
                <div className="text-xs text-gray-700 font-medium flex items-center">
                    <FontAwesomeIcon className="mr-2.5" icon={faMapLocationDot} />
                    <h4>{location}</h4>
                </div>
                <h1 className="text-[18px] text-gray-600 font-bold">{name}</h1>
                <div className="text-[14px] text-gray-600 font-normal flex items-center">
                    {category === 'cruise' && details?.launchYear && (
                        <>
                            <FontAwesomeIcon className="text-[18px] mr-2.5" icon={faShip} />
                            <p>
                                Hạ thuỷ {details.launchYear} - {details.material} - {details.rooms} phòng
                            </p>
                        </>
                    )}
                    {category === 'hotel' && details?.rooms && (
                        <>
                            <FontAwesomeIcon className="text-[18px] mr-2.5" icon={faBed} />
                            <p>Phòng {details.rooms}</p>
                        </>
                    )}
                </div>
            </div>
            <div className="pt-5 pb-6 px-6 flex justify-between items-center">
                <div>
                    {originalPrice && price && (
                        <del className="uppercase text-[12px] font-bold text-gray-400">
                            {originalPrice.toLocaleString('vi-VN')} đ / {unit}
                        </del>
                    )}
                    {price && (
                        <h3 className="text-[18px] font-bold text-gray-600">
                            {price.toLocaleString('vi-VN')} đ / {unit}
                        </h3>
                    )}
                </div>
                <Button primary rounded className="px-4 py-[10px] text-[14px]">
                    {price ? 'Đặt ngay' : 'Liên hệ'}
                </Button>
            </div>
        </Link>
    );
};

ServiceCard.propTypes = {
    category: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    details: PropTypes.shape({
        launchYear: PropTypes.number,
        material: PropTypes.string,
        rooms: PropTypes.number,
    }),
    originalPrice: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string.isRequired,
    rating: PropTypes.shape({
        score: PropTypes.number.isRequired,
        count: PropTypes.number.isRequired,
    }).isRequired,
    to: PropTypes.string,
};

export default ServiceCard;
