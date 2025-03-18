import { Check, Wifi, Tv, Utensils, Wine, Clock, Bath, Coffee } from "lucide-react"

const HotelFeatures = () => {
  return (
    <div className="container lg:w-6xl place-self-center px-5 lg:px-0 mx-auto">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left column - Features */}
        <div className="w-full lg:w-2/3">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Đặc điểm nổi bật</h2>

          {/* Decorative wave pattern */}
          <div className="flex mb-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="w-3 h-3 text-teal-400">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M2 12C2 12 5 8 12 8C19 8 22 12 22 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            ))}
          </div>

          {/* Amenities grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="text-teal-500">
                <Wifi className="w-6 h-6" />
              </div>
              <span className="text-gray-700">Wifi miễn phí</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-teal-500">
                <Utensils className="w-6 h-6" />
              </div>
              <span className="text-gray-700">Nhà hàng</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-teal-500">
                <Wine className="w-6 h-6" />
              </div>
              <span className="text-gray-700">Quầy bar</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-teal-500">
                <Clock className="w-6 h-6" />
              </div>
              <span className="text-gray-700">Lễ tân 24 giờ</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-teal-500">
                <Coffee className="w-6 h-6" />
              </div>
              <span className="text-gray-700">Bữa sáng miễn phí</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-teal-500">
                <Bath className="w-6 h-6" />
              </div>
              <span className="text-gray-700">Bồn tắm</span>
            </div>
          </div>

          {/* Highlighted features */}
          <div className="space-y-5">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center text-teal-500">
                <Check className="w-4 h-4" />
              </div>
              <p className="text-gray-700">Khách sạn được thiết kế với phong cách hiện đại và sang trọng</p>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center text-teal-500">
                <Check className="w-4 h-4" />
              </div>
              <p className="text-gray-700">Phòng ngủ tiện nghi sang trọng với tầm nhìn panorama ra biển và thành phố</p>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center text-teal-500">
                <Check className="w-4 h-4" />
              </div>
              <p className="text-gray-700">
                Đặc biệt hơn, khách sạn có hồ bơi vô cực trên tầng thượng là địa điểm checkin yêu thích của mọi du khách
              </p>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center text-teal-500">
                <Check className="w-4 h-4" />
              </div>
              <p className="text-gray-700">
                Vị trí đắc địa, chỉ cách bãi biển 5 phút đi bộ và gần các điểm tham quan nổi tiếng
              </p>
            </div>
          </div>
        </div>

        {/* Right column - Hotel Information */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Thông tin khách sạn</h3>

            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-teal-500">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16 2V6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8 2V6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3 10H21"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-600">Xây dựng</span>
                </div>
                <span className="font-medium text-gray-800">2019</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-teal-500">
                    <Tv className="w-5 h-5" />
                  </div>
                  <span className="text-gray-600">Số phòng</span>
                </div>
                <span className="font-medium text-gray-800">120</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-teal-500">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 6V12L16 14"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-600">Nhận phòng</span>
                </div>
                <span className="font-medium text-gray-800">14:00</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-teal-500">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 6V12L8 14"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-600">Trả phòng</span>
                </div>
                <span className="font-medium text-gray-800">12:00</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-teal-500">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-600">Quản lý</span>
                </div>
                <span className="font-medium text-gray-800">Citadines Marina Hạ Long</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HotelFeatures

