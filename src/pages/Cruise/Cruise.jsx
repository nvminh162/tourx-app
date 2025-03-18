import Hero from '../../components/Hero';
import imgHero from '../../assets/images/Hero';
import videoHaLongBay from '../../assets/videos/HaLongBay';
import CruiseForm from '../../components/Form/Cruise';
import { useState, useEffect } from 'react';
import extendedCruiseData from './cruiseData';

const Cruise = () => {
    const [cruises, setCruises] = useState([]);
    const [filterStars, setFilterStars] = useState([]);
    const [filterAmenities, setFilterAmenities] = useState([]);
    const [sortOption, setSortOption] = useState('none');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        setCruises(extendedCruiseData);
    }, []);

    const handleStarChange = (star) => {
        if (filterStars.includes(star)) {
            setFilterStars(filterStars.filter((s) => s !== star));
        } else {
            setFilterStars([...filterStars, star]);
        }
    };

    const handleAmenityChange = (amenity) => {
        if (filterAmenities.includes(amenity)) {
            setFilterAmenities(filterAmenities.filter((a) => a !== amenity));
        } else {
            setFilterAmenities([...filterAmenities, amenity]);
        }
    };

    const filteredCruises = cruises
        .filter((cruise) => {
            const matchesStar =
                filterStars.length === 0 || filterStars.some((star) => cruise.rating >= parseFloat(star));
            const matchesAmenity =
                filterAmenities.length === 0 || filterAmenities.every((amenity) => cruise.amenities.includes(amenity));
            return matchesStar && matchesAmenity;
        })
        .sort((a, b) => {
            if (sortOption === 'lowToHigh') {
                return a.priceValue - b.priceValue;
            } else if (sortOption === 'highToLow') {
                return b.priceValue - a.priceValue;
            }
            return 0;
        });

    const totalItems = filteredCruises.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentCruises = filteredCruises.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const getPaginationItems = () => {
        const pages = [];
        const maxPagesToShow = 5;
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

        if (endPage - startPage < maxPagesToShow - 1 && startPage > 1) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    };

    const paginationItems = getPaginationItems();

    return (
        <>
            <Hero className="relative" videoSrc={videoHaLongBay.halongbay} imageSrc={imgHero.halongbay}>
                <CruiseForm className="absolute left-1/2 -translate-x-1/2 top-1/2 lg:top-auto -translate-y-1/2 container lg:max-w-5xl" />
            </Hero>

            <div className="max-w-7xl mx-auto pt-50 px-4 lg:px-8">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
                    <div className="text-2xl font-bold text-gray-900 mb-4 lg:mb-0">
                        Tìm thấy {filteredCruises.length} kết quả
                    </div>
                    <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        className="text-sm text-gray-700 border border-gray-300 rounded-full px-6 py-3 h-12 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                        <option value="none">Không sắp xếp</option>
                        <option value="lowToHigh">Giá thấp đến cao</option>
                        <option value="highToLow">Giá cao đến thấp</option>
                    </select>
                </div>

                <div className="flex flex-col lg:flex-row gap-6 mb-8">
                    <div className="w-full lg:w-1/4 bg-white p-4 rounded-lg shadow">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Lọc kết quả</h3>
                        <div className="space-y-2">
                            <h4 className="text-md font-medium text-gray-600">Xếp hạng sao</h4>
                            {['3 sao', '4 sao', '5 sao'].map((star) => (
                                <label key={star} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={filterStars.includes(star[0])}
                                        onChange={() => handleStarChange(star[0])}
                                    />
                                    <span>{star}</span>
                                </label>
                            ))}
                            <h4 className="text-md font-medium text-gray-600 mt-4">Tiện ích</h4>
                            {[
                                'Phòng giãn',
                                'Cơ bản',
                                'Bảo gồm tại chỗ bỏ ăn',
                                'Giáp biển',
                                'Quầy bar',
                                'Lên 24 giờ',
                                'Nhà hàng',
                                'Khu vực bãi tắm riêng',
                                'Trung tâm thể dục',
                                'Phòng có bồn tắm',
                                'Wi-Fi miễn phí',
                                'Miễn phí kayaking',
                                'Trung tâm Spa & chăm sóc sức khỏe',
                                'Chỗ đỗ xe miễn phí',
                                'Miễn phí xe đưa đón',
                                'Có bể bơi ngoài trời',
                                'Đi tuyến Lan Hạ',
                                'Phòng không hút thuốc',
                                'Bể bơi ngoài trời',
                                'Du thuyền 5 sao',
                                'Chỗ đỗ xe',
                                'Trà/cà phê trong tất cả các phòng',
                                'Nhìn ra biển',
                                'Điều hòa',
                                'Cửa sổ từ sàn đến trần',
                                'Sạc điện thoại',
                                'Hồ bơi có tầm nhìn',
                                'Ban công riêng',
                                'Wi-Fi',
                                'Két an toàn',
                            ].map((amenity) => (
                                <label key={amenity} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={filterAmenities.includes(amenity)}
                                        onChange={() => handleAmenityChange(amenity)}
                                    />
                                    <span>{amenity}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="w-full lg:w-3/4 grid grid-cols-1 gap-6">
                        {currentCruises.map((cruise) => (
                            <div
                                key={cruise.id}
                                className="bg-white rounded-lg shadow-lg p-4 flex flex-col lg:flex-row items-start"
                            >
                                {/* Phần hình ảnh */}
                                <div className="w-full lg:w-1/3 aspect-[4/3] rounded-lg overflow-hidden mb-4 lg:mb-0">
                                    <img src={cruise.image} alt={cruise.name} className="w-full h-full object-cover" />
                                </div>
                                {/* Phần thông tin */}
                                <div className="lg:ml-6 w-full">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <span className="text-gray-500 text-sm">{cruise.location}</span>
                                            <h3 className="text-xl font-bold text-gray-900 mt-1">{cruise.name}</h3>
                                            <p className="text-gray-600 text-sm mt-1">{cruise.yearBuilt}</p>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {cruise.amenities.map((amenity, index) => (
                                                    <span
                                                        key={index}
                                                        className="text-gray-500 text-sm bg-gray-100 px-2 py-1 rounded"
                                                    >
                                                        {amenity}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-yellow-500 flex items-center">
                                                ★ {cruise.rating} {cruise.reviews}
                                            </span>
                                            <p className="text-lg font-semibold text-green-600 mt-2">{cruise.price}</p>
                                            <button className="mt-2 w-full lg:w-auto bg-teal-500 text-white py-2 px-4 rounded-full hover:bg-teal-600">
                                                Đặt ngay
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-between items-center mt-8 px-4 lg:px-8">
                    <span className="text-gray-600 text-sm font-medium">
                        Đang xem trang {currentPage} / {totalPages}
                    </span>

                    <div className="flex items-center space-x-2">
                        <button
                            onClick={handlePrevPage}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 transition duration-200"
                            disabled={currentPage === 1}
                        >
                            Trước
                        </button>

                        {paginationItems.map((page) => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`px-4 py-2 rounded-full transition duration-200 ${
                                    currentPage === page
                                        ? 'bg-[#25b0cd] text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                {page}
                            </button>
                        ))}

                        {totalPages > 5 && currentPage < totalPages - 2 && (
                            <span className="px-3 py-1 text-gray-600">...</span>
                        )}

                        {totalPages > paginationItems[paginationItems.length - 1] && (
                            <button
                                onClick={() => handlePageChange(totalPages)}
                                className={`px-4 py-2 rounded-full transition duration-200 ${
                                    currentPage === totalPages
                                        ? 'bg-[#25b0cd] text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                {totalPages}
                            </button>
                        )}

                        <button
                            onClick={handleNextPage}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 transition duration-200"
                            disabled={currentPage === totalPages}
                        >
                            Tiếp
                        </button>
                    </div>
                </div>

                <div className="min-h-30"></div>
            </div>
        </>
    );
};

export default Cruise;
