import PropTypes from 'prop-types';

import Header from '../../layouts/components/Header';
import Sidebar from '../../layouts/components/Sidebar';
import Footer from '../components/Footer';

const LeftSidebarLayout = ({ children }) => {
    return (
        <div className="w-full h-full">
            <Header />
            <div className="grid grid-cols-5 mx-auto mt-24 max-w-[1392px]">
                <div className="col-span-1">
                    <Sidebar />
                </div>
                <div className="col-span-4">{children}</div>
            </div>
            <Footer />
        </div>
    );
};

LeftSidebarLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default LeftSidebarLayout;
