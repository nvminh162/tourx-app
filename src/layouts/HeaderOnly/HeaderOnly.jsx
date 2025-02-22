import PropTypes from 'prop-types';

import Header from '~/layouts/components/Header';


function HeaderOnly({ children }) {
    return (
        <div className="w-full h-full">
            <Header />
            <div className="max-w-[1392px] mx-auto mt-24">
                <div className="">{children}</div>
            </div>
        </div>
    );
}

HeaderOnly.propTypes = {
    children: PropTypes.node.isRequired,
};

export default HeaderOnly;
