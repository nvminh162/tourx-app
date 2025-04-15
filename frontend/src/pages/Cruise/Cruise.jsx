import Hero from "../../components/Hero"
import imgHero from "../../assets/images/Hero"
import videoHaLongBay from "../../assets/videos/HaLongBay"
import CruiseForm from "../../components/Form/Cruise"
import { useState, useEffect } from "react"
// import cruiseData from "../../data/mocks/Services/cruises.json"
import { Link } from "react-router-dom"
import { getAllCruises } from '../../services/cruiseService';
import config from "../../config"

const Cruise = () => {
    const [cruises, setCruises] = useState([])
    const [filterStars, setFilterStars] = useState([])
    const [filterAmenities, setFilterAmenities] = useState([])
    const [sortOption, setSortOption] = useState("none")
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const itemsPerPage = 5

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await getAllCruises();
                setCruises(result);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu du thuyền:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleStarChange = (star) => {
        if (filterStars.includes(star)) {
            setFilterStars(filterStars.filter((s) => s !== star))
        } else {
            setFilterStars([...filterStars, star])
        }
    }

    const handleAmenityChange = (amenity) => {
        if (filterAmenities.includes(amenity)) {
            setFilterAmenities(filterAmenities.filter((a) => a !== amenity))
        } else {
            setFilterAmenities([...filterAmenities, amenity])
        }
    }

    const filteredCruises = cruises
        .filter((cruise) => {
            const matchesStar =
                filterStars.length === 0 || filterStars.some((star) => cruise.rating.score >= Number.parseFloat(star))
            const matchesAmenity =
                filterAmenities.length === 0 || filterAmenities.every((amenity) => cruise.amenities.includes(amenity))
            return matchesStar && matchesAmenity
        })
        .sort((a, b) => {
            if (sortOption === "lowToHigh") {
                return a.price - b.price
            } else if (sortOption === "highToLow") {
                return b.price - a.price
            }
            return 0
        })

    const totalItems = filteredCruises.length
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentCruises = filteredCruises.slice(startIndex, endIndex)

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page)
        }
    }

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1)
    }

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1)
    }

    const getPaginationItems = () => {
        const pages = []
        const maxPagesToShow = 5
        let startPage = Math.max(1, currentPage - 2)
        const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1)

        if (endPage - startPage < maxPagesToShow - 1 && startPage > 1) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1)
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i)
        }
        return pages
    }

    const paginationItems = getPaginationItems()

    const handleScrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <>
            <Hero className="relative" videoSrc={videoHaLongBay.halongbay} imageSrc={imgHero.halongbay}>
                <CruiseForm className="absolute left-1/2 -translate-x-1/2 top-1/2 lg:top-auto -translate-y-1/2 container lg:max-w-5xl" to={config.routes.cruise} />
            </Hero>

            <div className="max-w-7xl mx-auto pt-50 px-4 lg:px-8">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
                    <div className="text-2xl font-bold text-gray-900 mb-4 lg:mb-0">Tìm thấy {filteredCruises.length} kết quả</div>
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
                            {["3 sao", "4 sao", "5 sao"].map((star) => (
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
                                "Phòng giãn",
                                "Cơ bản",
                                "Bảo gồm tại chỗ bỏ ăn",
                                "Giáp biển",
                                "Quầy bar",
                                "Lên 24 giờ",
                                "Nhà hàng",
                                "Khu vực bãi tắm riêng",
                                "Trung tâm thể dục",
                                "Phòng có bồn tắm",
                                "Wi-Fi miễn phí",
                                "Miễn phí kayaking",
                                "Trung tâm Spa & chăm sóc sức khỏe",
                                "Chỗ đỗ xe miễn phí",
                                "Miễn phí xe đưa đón",
                                "Có bể bơi ngoài trời",
                                "Đi tuyến Lan Hạ",
                                "Phòng không hút thuốc",
                                "Bể bơi ngoài trời",
                                "Du thuyền 5 sao",
                                "Chỗ đỗ xe",
                                "Trà/cà phê trong tất cả các phòng",
                                "Nhìn ra biển",
                                "Điều hòa",
                                "Cửa sổ từ sàn đến trần",
                                "Sạc điện thoại",
                                "Hồ bơi có tầm nhìn",
                                "Ban công riêng",
                                "Wi-Fi",
                                "Két an toàn",
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

                    {loading ? (
                        <div className="w-full flex justify-center items-center py-10">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-light"></div>
                        </div>
                    ) : currentCruises.length === 0 ? (
                        <div className="w-full lg:w-3/4 flex justify-center items-center py-10">
                            <div className="text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                <h3 className="mt-4 text-xl font-medium text-gray-700">Không tìm thấy du thuyền nào</h3>
                                <p className="mt-2 text-gray-500">Không có du thuyền nào phù hợp với tiêu chí tìm kiếm của bạn.</p>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full lg:w-3/4 grid grid-cols-1 gap-6">
                            {currentCruises.map((cruise) => (
                                <div key={cruise.id} className="bg-white rounded-lg shadow-lg p-4 flex flex-col lg:flex-row items-start">
                                    <div className="w-full lg:w-1/3 aspect-[4/3] rounded-lg overflow-hidden mb-4 lg:mb-0">
                                        <img
                                            src={cruise.image || "/placeholder.svg"}
                                            alt={cruise.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="lg:ml-6 w-full">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <span className="text-gray-500 text-sm">{cruise.location}</span>
                                                <h3 className="text-xl font-bold text-gray-900 mt-1">{cruise.name}</h3>
                                                <p className="text-gray-600 text-sm mt-1">
                                                    Hạ thủy {cruise.details ? cruise.details.launchYear : "N/A"} -{" "}
                                                    {cruise.details ? cruise.details.material : "N/A"} -{" "}
                                                    {cruise.details ? cruise.details.rooms : "N/A"} phòng
                                                </p>
                                                <div className="flex flex-wrap gap-2 mt-2">
                                                    {cruise.amenities &&
                                                        cruise.amenities.map((amenity, index) => (
                                                            <span key={index} className="text-gray-500 text-sm bg-gray-100 px-2 py-1 rounded">
                                                                {amenity}
                                                            </span>
                                                        ))}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-yellow-500 flex items-center">
                                                    ★ {cruise.rating ? cruise.rating.score.toFixed(1) : "N/A"} (
                                                    {cruise.rating ? cruise.rating.count : 0} đánh giá)
                                                </span>
                                                <p className="text-lg font-semibold text-black mt-2">
                                                    {cruise.price.toLocaleString()}đ/khách
                                                </p>
                                                <button className="mt-2 w-full lg:w-auto bg-primary-light text-black py-2 px-4 rounded-full hover:bg-primary-base hover:text-white">
                                                    <Link to={`/cruise${cruise.to}`} onClick={handleScrollTop}>Đặt ngay</Link>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

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
                                className={`px-4 py-2 rounded-full transition duration-200 ${currentPage === page ? "bg-primary-light text-black" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    }`}
                            >
                                {page}
                            </button>
                        ))}

                        {totalPages > 5 && currentPage < totalPages - 2 && <span className="px-3 py-1 text-gray-600">...</span>}

                        {totalPages > paginationItems[paginationItems.length - 1] && (
                            <button
                                onClick={() => handlePageChange(totalPages)}
                                className={`px-4 py-2 rounded-full transition duration-200 ${currentPage === totalPages ? "bg-[#25b0cd] text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
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
    )
}

export default Cruise