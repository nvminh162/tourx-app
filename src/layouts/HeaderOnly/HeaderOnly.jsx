import PropTypes from 'prop-types';

import Header from '~/layouts/components/Header';
import Footer from './../components/Footer/Footer';

const HeaderOnly = ({ children }) => {
    return (
        <div className="w-full h-full">
            <Header />
            <div className="mx-auto mt-24 max-w-[1392px]">{children}</div>
            <Footer />
        </div>
    );
};

HeaderOnly.propTypes = {
    children: PropTypes.node.isRequired,
};

export default HeaderOnly;
