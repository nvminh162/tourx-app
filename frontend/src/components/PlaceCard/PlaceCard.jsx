import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Button from "../Button";
import Image from "../Image";

const PlaceCard = ({ name, image, to, className = "" }) => {
    const handleScrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <Link 
            to={to} 
            onClick={handleScrollTop} 
            className={`select-none justify-center bg-white rounded-4xl outline-1 outline-gray-300 w-96 space-y-6 cursor-pointer ${className}`}
        >
            <div className="pt-4 px-4 group">
                <Image
                    className="h-[216px] w-full rounded-4xl object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                    src={image}
                    alt={name}
                />
            </div>
            <h1 className="flex justify-center items-center text-[24px] text-gray-600 font-bold capitalize">{name}</h1>
            <div className="flex justify-center items-center mb-6">
                <Button rounded className="py-2.5 px-4">
                    Xem ngay
                </Button>
            </div>
        </Link>
    );
};

PlaceCard.propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    to: PropTypes.string,
    className: PropTypes.string,
};

export default PlaceCard;