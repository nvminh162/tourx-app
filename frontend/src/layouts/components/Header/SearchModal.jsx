import { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faStar } from "@fortawesome/free-solid-svg-icons"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import useDebounce from "../../../hooks/useDebounce";
// backup json file
// import serviceCruiseJson from '../../../data/mocks/Services/cruises.json'
// import serviceHotelsJson from '../../../data/mocks/Services/hotels.json'
import { getAllCruises } from '../../../services/cruiseService';
import { getAllHotels } from '../../../services/hotelService';

const SearchModal = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [filteredResults, setFilteredResults] = useState([])
  const [cruises, setCruises] = useState([])
  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const modalRef = useRef(null)
  const inputRef = useRef(null)
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Fetch dữ liệu khi component mở
  useEffect(() => {
    const fetchData = async () => {
      if (!isOpen) return;
      
      setLoading(true);
      setError(null);
      
      try {
        // Fetch dữ liệu từ API
        const [cruiseData, hotelData] = await Promise.all([
          getAllCruises(),
          getAllHotels()
        ]);
        
        setCruises(cruiseData.map(cruise => ({...cruise, category: "cruise"})));
        setHotels(hotelData.map(hotel => ({...hotel, category: "hotel"})));
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Không thể tải dữ liệu, vui lòng thử lại sau");
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose])

  // Lọc kết quả dựa trên dữ liệu API
  useEffect(() => {
    if (debouncedSearchTerm) {
      let results = [];

      if (selectedCategory === "all" || selectedCategory === "cruise") {
        const filteredCruises = cruises.filter(
          (item) =>
            item.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
            item.location.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        );
        results = [...results, ...filteredCruises];
      }

      if (selectedCategory === "all" || selectedCategory === "hotel") {
        const filteredHotels = hotels.filter(
          (item) =>
            item.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
            item.location.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        );
        results = [...results, ...filteredHotels];
      }

      setFilteredResults(results);
    } else {
      setFilteredResults([]);
    }
  }, [debouncedSearchTerm, selectedCategory, cruises, hotels]);

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose()
    }
  }

  // Format price to VND
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(price)
  }

  // Render star rating
  const renderStars = (score) => {
    const stars = []
    const fullStars = Math.floor(score)
    const hasHalfStar = score % 1 >= 0.5

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FontAwesomeIcon key={`star-${i}`} icon={faStar} className="text-yellow-400" />)
    }

    if (hasHalfStar) {
      stars.push(<FontAwesomeIcon key="half-star" icon={faStar} className="text-yellow-400 opacity-50" />)
    }

    const remainingStars = 5 - stars.length
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FontAwesomeIcon key={`empty-star-${i}`} icon={faStar} className="text-gray-300" />)
    }

    return stars
  }

  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={handleClickOutside}>
      <div
        ref={modalRef}
        className="w-full max-w-4xl max-h-[80vh] bg-white rounded-lg shadow-xl overflow-hidden flex flex-col"
      >
        <div className="relative p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center flex-1">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="text-gray-500 mr-3" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Tìm kiếm du thuyền, khách sạn..."
                className="w-full bg-transparent text-gray-900 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="mr-9">
              <select
                className="border border-gray-300 rounded-md px-3 py-1 outline-none"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">Tất cả</option>
                <option value="cruise">Du thuyền</option>
                <option value="hotel">Khách sạn</option>
              </select>
            </div>
          </div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <span className="px-2 py-1 text-xs bg-gray-200 text-gray-600 rounded">esc</span>
          </div>
        </div>

        <div className="overflow-y-auto flex-1">
          {loading ? (
            <div className="flex items-center justify-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-light"></div>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center py-8">{error}</div>
          ) : searchTerm ? (
            <div className="p-4">
              {filteredResults.length > 0 ? (
                <div className="space-y-4">
                  {filteredResults.map((item) => (
                    <Link
                      to={item.category === "cruise" ? `/cruise${item.to}` : `/hotel${item.to}`}
                      key={item.id}
                      className="block"
                      onClick={onClose}
                    >
                      <div className="flex border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        <div className="w-32 h-32 flex-shrink-0">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 p-4">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-medium text-lg">{item.name}</h3>
                              <div className="flex items-center mt-1">
                                <div className="flex mr-2">{renderStars(item.rating.score)}</div>
                                <span className="text-sm text-gray-600">({item.rating.count} đánh giá)</span>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">{item.location}</p>
                              <div className="mt-1">
                                <span className="text-sm text-gray-500">
                                  {item.category === "cruise" ? "Du thuyền" : "Khách sạn"}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              {item.originalPrice && (
                                <p className="text-sm text-gray-500 line-through">{formatPrice(item.originalPrice)}</p>
                              )}
                              <p className="font-bold text-lg text-primary-base">{formatPrice(item.price)}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 text-center py-8">Không tìm thấy kết quả cho {searchTerm}</div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-gray-500">Nhập từ khóa để tìm kiếm</div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  )
}

SearchModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default SearchModal