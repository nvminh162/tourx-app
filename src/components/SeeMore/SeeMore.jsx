import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../Button';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const SeeMore = ({ title, to }) => {
    const handleScrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    
    return (
        <div className="flex justify-center items-center">
            <Button
                rounded
                className="py-4 px-5"
                iconRight={<FontAwesomeIcon icon={faArrowRight} />}
                to={to}
                onClick={handleScrollTop}
            >
                {title}
            </Button>
        </div>
    );
};

SeeMore.propTypes = {
    title: PropTypes.string,
    to: PropTypes.string,
};

export default SeeMore;
