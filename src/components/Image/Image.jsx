import PropTypes from 'prop-types';
import { forwardRef, useState } from 'react';

import imgError from '../../assets/images/error';

// eslint-disable-next-line react/display-name
const Image = forwardRef(
    ({ src, alt, className, fallback = imgError.imgDefault, ...props }, ref) => {
        const [_fallback, setFallback] = useState('');

        const handleError = () => {
            setFallback(fallback);
        };

        return (
            <img
                className={className}
                ref={ref}
                src={src || _fallback}
                alt={alt}
                {...props}
                onError={handleError}
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
