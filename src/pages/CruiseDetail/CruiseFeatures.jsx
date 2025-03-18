import { Check, Anchor, Home, Utensils, Wine, Clock, Bath, Coffee } from "lucide-react"

const CruiseFeatures = () => {
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
                  <Coffee className="w-6 h-6" />
                </div>
                <span className="text-gray-700">Có bể sục</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-teal-500">
                  <Utensils className="w-6 h-6" />
                </div>
                <span className="text-gray-700">Bao gồm tất cả các bữa ăn</span>
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
                  <Home className="w-6 h-6" />
                </div>
                <span className="text-gray-700">Nhà hàng</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-teal-500">
                  <Bath className="w-6 h-6" />
                </div>
                <span className="text-gray-700">Phòng có bồn tắm</span>
              </div>
            </div>

            {/* Highlighted features */}
            <div className="space-y-5">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center text-teal-500">
                  <Check className="w-4 h-4" />
                </div>
                <p className="text-gray-700">Du thuyền được thiết kế với phong cách sang trọng và truyền thống</p>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center text-teal-500">
                  <Check className="w-4 h-4" />
                </div>
                <p className="text-gray-700">
                  Phòng ngủ tiện nghi sang trọng mang phong cách Á Đông đều có bồn tắm cạnh cửa kính lớn view vịnh
                </p>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center text-teal-500">
                  <Check className="w-4 h-4" />
                </div>
                <p className="text-gray-700">
                  Đặc biệt hơn, du thuyền thiết kế bể bơi 4 mùa to rộng là địa điểm checkin yêu thích của mọi du khách
                </p>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center text-teal-500">
                  <Check className="w-4 h-4" />
                </div>
                <p className="text-gray-700">
                  Du thuyền có nhiều lịch trình 2 ngày 1 đêm, 3 ngày 2 đêm và 4 ngày 3 đêm cho những ai muốn 1 lịch trình
                  dài hơn trên vịnh Lan Hạ
                </p>
              </div>
            </div>
          </div>

          {/* Right column - Cruise Information */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Thông tin du thuyền</h3>

              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-teal-500">
                      <Anchor className="w-5 h-5" />
                    </div>
                    <span className="text-gray-600">Hạ thủy</span>
                  </div>
                  <span className="font-medium text-gray-800">2019</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-teal-500">
                      <Home className="w-5 h-5" />
                    </div>
                    <span className="text-gray-600">Cabin</span>
                  </div>
                  <span className="font-medium text-gray-800">20</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-teal-500">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M4 19H20M7 3V19M17 3V19M4 3H20M4 11H20"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-600">Thân vỏ</span>
                  </div>
                  <span className="font-medium text-gray-800">Kim loại</span>
                </div>

                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-teal-500 mt-1">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M9 17L4 22M20 2L15 7M15 2L20 7M4 2L9 7M12 10L16 14M16 10L12 14M3 10C3 10 7 15 12 15C17 15 21 10 21 10"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-600">Hành trình</span>
                  </div>
                  <span className="font-medium text-gray-800 text-right">
                    Vịnh Lan Hạ - Bãi tắm Ba Trái Đào - Hang Sáng Tối
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-teal-500">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-600">Điều hành</span>
                  </div>
                  <span className="font-medium text-gray-800">Công ty cổ phần Heritage Cruises</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default CruiseFeatures
