import PropTypes from 'prop-types';

import Header from '~/layouts/components/Header';
import Sidebar from '~/layouts/components/Sidebar';


function LeftSidebarLayout({ children }) {
    return (
        <div className="w-full h-full">
            <Header />
            <div className="grid grid-cols-5 mx-auto mt-24 max-w-7xl">
                <div className="col-span-1">
                    <Sidebar />
                </div>
                <div className="col-span-4">{children}</div>
            </div>
        </div>
    );
}

LeftSidebarLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default LeftSidebarLayout;
