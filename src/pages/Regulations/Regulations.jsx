import { useState } from "react";

const regulationsData = [
  {
    id: "content1",
    title: "Thời gian nhận phòng",
    content: "Giờ nhận phòng từ 12h15-12h30. Nếu quý khách không sử dụng dịch vụ xe đưa đón của tàu và tự di chuyển, vui lòng có mặt tại bến tàu muộn nhất là 11h45 để làm thủ tục trước khi lên tàu."
  },
  {
    id: "content2",
    title: "Thời gian trả phòng",
    content: "Giờ trả phòng từ 9h30-10h30 tùy thuộc vào lịch trình của tàu. Sau khi trả phòng, quý khách sẽ được phục vụ bữa trưa trên tàu trước khi tàu cập bến."
  },
  {
    id: "content3",
    title: "Quy định nhận phòng",
    content: "Đối với người lớn: quý khách vui lòng gửi ảnh chụp CCCD hoặc CMT hoặc Hộ chiếu.\n\nĐối với trẻ em dưới 14 tuổi: quý khách vui lòng gửi ảnh chụp Giấy khai sinh hoặc Hộ chiếu.\n\nNhững giấy tờ trên, quý khách vui lòng gửi trước ít nhất 03 ngày trước khi đi tàu và sẽ được yêu cầu xuất trình khi làm thủ tục lên tàu."
  },
  {
    id: "content4",
    title: "Giá phòng đã bao gồm",
    content: "- Hướng dẫn viên trên tàu\n- Các bữa ăn theo tiêu chuẩn (01 bữa trưa, 01 bữa tối, 01 bữa sáng, 1 bữa trưa nhẹ)\n- Lớp học nấu ăn, Bơi lội (nếu thời tiết cho phép), xem phim, câu mực, xem tivi vệ tinh\n- Phòng tập gym trên tàu\n- Vé tham quan tại các điểm có trong chương trình\n- Phòng theo tiêu chuẩn 5 sao trên du thuyền\n- Đồ uống chào mừng, khăn lạnh\n- Nước lọc trong mỗi phòng"
  },
  {
    id: "content5",
    title: "Giá phòng không bao gồm",
    content: "- Xe khứ hồi Hà Nội - Hạ Long. Xe Limousine D-car 7 chỗ đưa đón hai chiều (giá 350,000 VND/1 khách/1 chiều và 650,000 VND/1 khách/2 chiều)\n- Khách sạn lưu trú trên đất liền\n- Dịch vụ spa, Đồ uống trên tàu và thuốc lá\n- Tiền tip và các chi phí khác không có trong phần đã bao gồm"
  },
  {
    id: "content6",
    title: "Trẻ em, giường phụ và phụ thu cuối tuần",
    content: "Mỗi du thuyền sẽ có những quy định riêng về mức phụ thu trẻ em, giường phụ hay phụ thu cuối tuần. Quý khách có thể kiểm tra lại với nhân viên của chúng tôi để được tư vấn chi tiết và cụ thể."
  },
  {
    id: "content7",
    title: "Huỷ đặt phòng",
    content: "Những mức giá tốt trên đây đều có điều kiện chung là không được hoàn/hủy và được phép đổi ngày. Quý khách vui lòng liên hệ với chúng tôi để nhận được sự hỗ trợ tốt nhất."
  },
  {
    id: "content8",
    title: "Hoãn hủy do điều kiện thời tiết",
    content: "Trong trường hợp điều kiện thời tiết không cho phép thực hiện chuyến đi, Ban Quản lý Vịnh sẽ có chỉ đạo trực tiếp. Chúng tôi sẽ gửi tới quý khách chính sách cụ thể của từng du thuyền."
  }
];

const Regulations = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleContent = (id) => {
    setOpenSection(openSection === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 border-b-2 pb-3">Quy định chung và lưu ý</h1>
        </div>

        {/* Nội dung */}
        <div className="space-y-6">
          {regulationsData.map(({ id, title, content }) => (
            <div key={id} className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
              <button
                className="w-full flex justify-between items-center p-4 text-lg font-semibold text-gray-800 bg-gray-50 hover:bg-gray-100"
                onClick={() => toggleContent(id)}
              >
                <span>{title}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className={`transform transition-transform ${openSection === id ? "rotate-180" : "rotate-0"}`}
                >
                  <path d="M6 12L18 12" stroke="#77dada" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </button>
              {openSection === id && (
                <div className="p-4 border-t border-gray-200 text-gray-700 bg-white">
                  <p>{content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Regulations;
