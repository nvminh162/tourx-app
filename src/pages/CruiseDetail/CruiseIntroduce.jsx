const CruiseIntroduce = () => {
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
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Giới thiệu về du thuyền</h3>

        <p className="text-gray-600 mb-4">
          Giới thiệu về du thuyền Heritage Bình Chuẩn Cát Bà, thiết kế mang đậm nét hoài cổ điển và lịch sử, với cảm
          hứng từng là du thuyền của vua Bảo Đại, vị vua cuối cùng của triều đại nhà Nguyễn, chiếc tàu được thiết kế với
          20 cabin sang trọng, mỗi cabin đều có ban công riêng, bồn tắm sang trọng và cửa kính lớn view vịnh.
        </p>

        <div className="my-6">
          <img
            src="https://minio.fares.vn/mixivivu-dev/tour/du-thuyen-heritage-binh-chuan-cat-ba/blog/iv9fjnleft3mnbuo.webp"
            alt="Du thuyền Heritage Bình Chuẩn Cát Bà về đêm"
            className="w-full h-auto rounded-lg object-cover"
          />
          <p className="text-sm text-gray-500 mt-2 italic text-center">Du thuyền Heritage Bình Chuẩn Cát Bà về đêm</p>
        </div>

        <p className="text-gray-600 mb-4">
          Điểm nhấn của thuyền là bể bơi 4 mùa ngoài trời lớn nhất vịnh Lan Hạ, nơi đây du khách có thể ngắm nhìn toàn
          cảnh vịnh Lan Hạ và vịnh Hạ Long, du khách có thể tham gia các hoạt động giải trí trên tàu như: chèo kayak để
          khám phá vẻ đẹp của vịnh, tham gia lớp học nấu ăn, lớp học Vovinam, Yoga, tham gia câu mực đêm, tham quan làng
          chài Việt Hải, hang Sáng Tối và hang Luồn, ngắm hoàng hôn.
        </p>

        <div className="my-6">
          <img
            src="https://minio.fares.vn/mixivivu-dev/tour/du-thuyen-heritage-binh-chuan-cat-ba/blog/1790l9warvgsukpr.webp"
            alt="Bể bơi 4 mùa trên du thuyền"
            className="w-full h-auto rounded-lg object-cover"
          />
          <p className="text-sm text-gray-500 mt-2 italic text-center">Bể bơi 4 mùa trên du thuyền</p>
        </div>

        <p className="text-gray-600 mb-4">
          Nhà hàng, bar trên du thuyền thiết kế theo phong cách Đông Dương cổ điển, nơi du khách thưởng thức ẩm thực và
          đồ uống cao cấp, thư viện trên tàu cung cấp sách và tạp chí cho du khách đọc, spa và khu vực thư giãn mang đến
          cho du khách những trải nghiệm thư giãn tuyệt vời. Đội ngũ nhân viên chuyên nghiệp và thân thiện sẽ đảm bảo
          chuyến đi của bạn tuyệt vời.
        </p>

        <div className="my-6">
          <img
            src="https://minio.fares.vn/mixivivu-dev/tour/du-thuyen-heritage-binh-chuan-cat-ba/blog/fgbux3svpxwcs3f1.webp"
            alt="Nhà hàng trên du thuyền"
            className="w-full h-auto rounded-lg object-cover"
          />
          <p className="text-sm text-gray-500 mt-2 italic text-center">Nhà hàng trên du thuyền</p>
        </div>
      </div>
    </div>
  )
}

export default CruiseIntroduce
