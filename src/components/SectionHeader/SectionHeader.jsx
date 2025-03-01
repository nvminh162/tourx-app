import PropTypes from 'prop-types';
import clsx from 'clsx';

import imgUtils from '../../assets/images/utils';

const SectionHeader = ({ title, description, children, titleSize = '100%', reverse, className }) => {
    return (
        <div className={clsx('max-w-7xl mx-auto grid gap-10 lg:gap-20', className)}>
            <div className={clsx('grid grid-cols-1 gap-8', { 'lg:grid-cols-5': !reverse })}>
                <div className={clsx('col-span-3 text-4xl font-bold text-gray-900', { 'flex flex-col items-center': reverse })}>
                    <h1 style={{ maxWidth: typeof titleSize === 'number' ? `${titleSize}px` : titleSize }} className="font-bold">
                        {title}
                    </h1>
                    <img className="mt-8" src={imgUtils.headingBorder} alt="spacing" />
                </div>
                <div className={clsx('col-span-2 text-[18px] text-gray-600 font-medium', { 'flex flex-col items-center': reverse })}>
                    {description}
                </div>
            </div>
            {children}
        </div>
    );
};

SectionHeader.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    children: PropTypes.node,
    titleSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    className: PropTypes.string,
    reverse: PropTypes.bool,
};

export default SectionHeader;
