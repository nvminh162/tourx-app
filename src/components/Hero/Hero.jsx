import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Image from '~/components/Image';

const Hero = ({ videoSrc, imageSrc, className, children }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsVisible(true);
        }, 100);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className={className}>
            <video
                className={`hidden lg:block rounded-4xl transition-all duration-500 ease-in-out transform
                    ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                autoPlay
                muted
                loop
            >
                <source src={videoSrc} type="video/mp4" />
            </video>
            <Image className="block lg:hidden min-h-[600px] w-full h-full object-cover" src={imageSrc} alt="hero image" />
            {children}
        </div>
    );
};


Hero.propTypes = {
    videoSrc: PropTypes.string,
    imageSrc: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
};

export default Hero;
