import PropTypes from 'prop-types';
import { forwardRef, useState } from 'react';

import defaults from '../../assets/images/default';

// eslint-disable-next-line react/display-name
const Image = forwardRef(
    ({ src, alt, className, fallback = defaults.imgDefault, ...props }, ref) => {
        const [error, setError] = useState(false);

        return (
            <img
                className={className}
                ref={ref}
                src={error ? fallback : src}
                alt={alt}
                {...props}
                onError={() => setError(true)} 
            />
        );
    },
);


Image.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    className: PropTypes.string,
    fallback: PropTypes.string,
};

export default Image;
