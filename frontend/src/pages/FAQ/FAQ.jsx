import { useState } from "react";

const faqData = [
  {
    id: "faq1",
    title: "Dịch vụ xe đưa đón có bao gồm trong giá tour không?",
    content: "Xe đưa đón 2 chiều không bao gồm trong giá tour. Quý khách có thể đặt thêm dịch vụ này."
  },
  {
    id: "faq2",
    title: "Nhà hàng của du thuyền phục vụ bữa ăn theo phong cách gì?",
    content: "Thực đơn của nhà hàng sẽ được phục vụ các món ăn theo phong cách Việt và Âu. Nếu quý khách có yêu cầu riêng, vui lòng thông báo trước ít nhất 03 ngày với du thuyền."
  },
  {
    id: "faq3",
    title: "Tôi có được phép mang thú cưng lên tàu không?",
    content: "Thú cưng không được phép mang lên du thuyền."
  },
  {
    id: "faq4",
    title: "Du thuyền có dịch vụ massage không?",
    content: "Có. Du thuyền cung cấp dịch vụ massage chuyên nghiệp và có tính phí (không bao gồm trong giá tour)."
  },
  {
    id: "faq5",
    title: "Nếu ngày đi tour của tôi đúng vào sinh nhật thì có ưu đãi gì không?",
    content: "Nếu ngày sinh nhật của quý khách đúng vào ngày đi tour, du thuyền sẽ tặng quý khách 01 bánh sinh nhật nhỏ. Ngoài ra, du thuyền còn nhận đặt dịch vụ (tính phí) với các yêu cầu đặc biệt như: trang trí giường, phòng hay chuẩn bị bàn ăn riêng. Quý khách vui lòng liên hệ nhân viên của chúng tôi để có thêm những thông tin chi tiết hơn."
  },
  {
    id: "faq6",
    title: "Trên tàu có WIFI không?",
    content: "Tín hiệu Wifi trên tàu sẽ không được ổn định khi tàu đi qua một số khu vực trên Vịnh."
  },
  {
    id: "faq7",
    title: "Tàu có phụ thu vào cuối tuần không?",
    content: "Du thuyền có phụ thu vào dịp cuối tuần. Quý khách sẽ được nhân viên tư vấn của chúng tôi thông tin khi có ngày đặt phòng cụ thể."
  },
  {
    id: "faq8",
    title: "Du thuyền có tour mấy ngày?",
    content: "Du thuyền cung cấp chương trình tour 02 ngày 01 đêm hoặc 03 ngày 02 đêm."
  },
  {
    id: "faq9",
    title: "Thời gian di chuyển từ bến ra tàu có lâu không?",
    content: "Đối với một số tàu, du khách có thể lên tàu trực tiếp mà không cần phải di chuyển bằng cano cao tốc. Hoặc nếu có di chuyển bằng cano thì thời gian di chuyển chỉ khoảng 10-15 phút."
  },
  {
    id: "faq10",
    title: "Du thuyền có cung cấp dịch vụ chèo kayak không?",
    content: "Các tàu đều cung cấp dịch vụ chèo kayak có tính phí hoặc không tính phí trong giá tour. Quý khách có thể liên hệ với nhân viên tư vấn của chúng tôi để biết thêm mức phí này."
  },
  {
    id: "faq11",
    title: "Phụ nữ mang thai có thể lên tàu không?",
    content: "Phụ nữ mang thai có thể lên tàu nhưng không được khuyến khích tham gia các hoạt động tham quan."
  },
  {
    id: "faq12",
    title: "Đồ uống có bao gồm trong giá tour không?",
    content: "Du thuyền phục vụ: trà, cà phê và 02 chai nước lọc miễn phí tại mỗi phòng/01 đêm nghỉ. Những đồ uống khác sẽ được phục vụ tại quầy bar trên tàu có tính phí và không bao gồm trong giá tour."
  }
];

const FAQ = () => {
  const [openSections, setOpenSections] = useState([]);

  const toggleContent = (id) => {
    setOpenSections((prevSections) =>
      prevSections.includes(id)
        ? prevSections.filter((sectionId) => sectionId !== id)
        : [...prevSections, id]
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Câu hỏi thường gặp</h1>
        </div>
        <div className="space-y-6">
          {faqData.map(({ id, title, content }) => (
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
                  className={`transform transition-transform ${openSections.includes(id) ? "rotate-180" : "rotate-0"}`}
                >
                  <path d="M6 12L18 12" stroke="#77dada" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {openSections.includes(id) && (
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

export default FAQ;
