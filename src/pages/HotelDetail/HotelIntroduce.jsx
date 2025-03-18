const HotelIntroduce = () => {
  return (
    <div className="container lg:w-6xl place-self-center px-5 lg:px-0 mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Giới thiệu</h2>

      {/* Decorative wave pattern */}
      <div className="flex mb-6">
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

      <div className="prose prose-lg max-w-none">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Giới thiệu về khách sạn</h3>

        <p className="text-gray-600 mb-4">
          Citadines Marina Hạ Long là khách sạn 5 sao sang trọng tọa lạc tại vị trí đắc địa với tầm nhìn tuyệt đẹp ra
          vịnh Hạ Long. Khách sạn được thiết kế theo phong cách hiện đại, kết hợp hài hòa giữa kiến trúc đương đại và
          nét văn hóa truyền thống Việt Nam, mang đến không gian nghỉ dưỡng đẳng cấp và tiện nghi cho du khách.
        </p>

        <div className="my-6">
          <img
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200&auto=format&fit=crop"
            alt="Hồ bơi vô cực trên tầng thượng"
            className="w-full h-auto rounded-lg object-cover"
          />
          <p className="text-sm text-gray-500 mt-2 italic text-center">
            Hồ bơi vô cực trên tầng thượng với tầm nhìn panorama
          </p>
        </div>

        <p className="text-gray-600 mb-4">
          Điểm nhấn của khách sạn là hồ bơi vô cực trên tầng thượng, nơi du khách có thể ngắm nhìn toàn cảnh vịnh Hạ
          Long và thành phố. Khách sạn cung cấp đầy đủ các tiện nghi cao cấp như nhà hàng phục vụ ẩm thực quốc tế, quầy
          bar với các loại đồ uống đặc sắc, trung tâm thể dục hiện đại và dịch vụ spa đẳng cấp.
        </p>

        <div className="my-6">
          <img
            src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1200&auto=format&fit=crop"
            alt="Phòng Suite sang trọng"
            className="w-full h-auto rounded-lg object-cover"
          />
          <p className="text-sm text-gray-500 mt-2 italic text-center">Phòng Suite sang trọng với tầm nhìn ra vịnh</p>
        </div>

        <p className="text-gray-600 mb-4">
          Các phòng nghỉ tại Citadines Marina Hạ Long được thiết kế rộng rãi, trang bị nội thất cao cấp và các tiện nghi
          hiện đại. Mỗi phòng đều có cửa sổ lớn hoặc ban công riêng, mang đến tầm nhìn tuyệt đẹp ra vịnh hoặc thành phố.
          Phòng tắm sang trọng với bồn tắm và vòi sen riêng biệt, cùng với các sản phẩm chăm sóc cá nhân cao cấp.
        </p>

        <div className="my-6">
          <img
            src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1200&auto=format&fit=crop"
            alt="Nhà hàng sang trọng"
            className="w-full h-auto rounded-lg object-cover"
          />
          <p className="text-sm text-gray-500 mt-2 italic text-center">Nhà hàng với không gian sang trọng</p>
        </div>
      </div>
    </div>
  )
}

export default HotelIntroduce

