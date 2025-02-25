import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import SelectMenus from '../../../components/SelectMenus';
import Button from '../../../components/Button';

import halongbayJson from '../../../data/mocks/Places/halongbay.json';
import priceJson from '../../../data/mocks/Price/price.json';

const CruiseForm = ({ className }) => {
    return (
        <div className={`py-10 px-6 bg-white items-center shadow-md border border-gray-300 rounded-4xl space-y-10 ${className}`}>
            <div className="text-center space-y-5 text-gray-900">
                <h2 className="text-4xl font-bold">Bạn sẽ lựa chọn du thuyền nào?</h2>
                <p className="text-[18px] font-light">Hơn 100 tour du thuyền hạng sang giá tốt đang chờ bạn</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-20 gap-5">
                {/* Item 1 => Search */}
                <div className="col-span-1 lg:col-span-7">
                    <div className="flex w-full items-center rounded-full bg-white border border-gray-300 pl-4 shadow-sm transition-all focus-within:shadow-[0_0_7px_3px_theme('colors.primary-light')]">
                        <div className="shrink-0 text-gray-500">
                            <FontAwesomeIcon icon={faSearch} />
                        </div>
                        <input
                            type="text"
                            placeholder="Nhập tên du thuyền"
                            className="px-4 py-3 block w-full bg-transparent text-base text-gray-900 placeholder:text-gray-400 focus:outline-none"
                        />
                    </div>
                </div>
                {/* Item 2 => Options */}
                <div className="col-span-1 lg:col-span-5">
                    <SelectMenus data={halongbayJson} />
                </div>
                {/* Item 3 => Options */}
                <div className="col-span-1 lg:col-span-5">
                    <SelectMenus data={priceJson} />
                </div>
                {/* Item 4 => Submitnpm  */}
                <Button primary rounded className="col-span-1 lg:col-span-3 py-3">
                    Tìm kiếm
                </Button>
            </div>
        </div>
    );
};

CruiseForm.propTypes = {
    className: PropTypes.string,
};

export default CruiseForm;
