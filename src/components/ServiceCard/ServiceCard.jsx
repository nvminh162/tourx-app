import PropTypes from 'prop-types';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faMapLocationDot, faShip } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from './../Button/Button';

const ServiceCard = ({ category, name, location, details, price, image, rating, to }) => {
    const handleScrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return (
        <div className="select-none bg-white rounded-4xl outline-1 outline-gray-300 space-y-5 w-96">
            <div className="pt-4 px-4">
                <div className="relative">
                    <img className="h-[216px] w-full rounded-4xl object-cover" src={image} alt={name} />
                    <span className="absolute top-0 left-0 bg-warning-light  py-1 px-2 rounded-full text-warning-dark text-xs font-semibold m-3">
                        <FontAwesomeIcon className="mr-1 text-warning-base" icon={faStar} />
                        <span className="mr-1">({rating.score})</span>
                        <span className="mr-1">({rating.count})</span>
                        <span>đánh giá</span>
                    </span>
                </div>
            </div>
            <div className="space-y-3 px-6">
                <div className="text-xs text-gray-700 font-medium flex items-center">
                    <FontAwesomeIcon className="px-2" icon={faMapLocationDot} />
                    <h4>{location}</h4>
                </div>
                <h1 className="text-[18px] text-gray-600 font-bold">{name}</h1>
                <div className="text-[14px] text-gray-600 space-x-2 font-normal flex items-center">
                    <FontAwesomeIcon className="text-[18px] mr-2.5" icon={faShip} />
                    {category === 'cruise' && details && (
                        <p>
                            Hạ thuỷ {details?.launchYear} - {details?.material} - {details?.rooms} phòng
                        </p>
                    )}
                </div>
            </div>
            <div className="pt-5 pb-6 px-6 flex justify-between items-center">
                <h3 className="text-[18px] font-bold text-gray-600">
                    {price ? price.toLocaleString('vi-VN') : 'Liên hệ'} đ / khách
                </h3>
                <Button primary rounded className="px-4 py-[10px] text-[14px]" to={to} onClick={handleScrollTop}>
                    Đặt ngay
                </Button>
            </div>
        </div>
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
    }).isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    rating: PropTypes.shape({
        score: PropTypes.number,
        count: PropTypes.number,
    }).isRequired,
    to: PropTypes.string,
};

export default ServiceCard;
