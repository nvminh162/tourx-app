import PropTypes from 'prop-types';
import TableOfContents from '../../components/TableOfContents';
const userManualData = [
    {
        id: '1',
        title: 'Đặt tour, tìm vé máy bay, tìm khách sạn',
        sections: [
            {
                id: '1.1',
                subtitle: 'Đặt tour trong nước và quốc tế',
                content: [
                    'Bước 1: Tìm kiếm tour phù hợp bằng cách nhập điểm đến, thời gian và số lượng người tham gia.',
                    'Bước 2: Chọn tour mong muốn, xem chi tiết lịch trình, giá cả và chính sách đi kèm.',
                    'Bước 3: Nhập thông tin cá nhân gồm: Họ và tên, số điện thoại, email và số lượng khách đi kèm.',
                    "Bước 4: Nhấn 'Đặt ngay' để gửi yêu cầu đặt tour.",
                    'Bước 5: Hệ thống tiếp nhận và xử lý thông tin đơn hàng.',
                    'Bước 6: Nhân viên tư vấn liên hệ xác nhận, kiểm tra đơn hàng và hướng dẫn thanh toán.',
                    'Bước 7: Sau khi thanh toán hoàn tất, khách hàng nhận được xác nhận đặt tour qua email, bao gồm mã đơn hàng, thông tin khách hàng, chi tiết tour và tổng chi phí.',
                ],
            },
            {
                id: '1.2',
                subtitle: 'Tìm vé máy bay',
                content: [
                    'Bước 1: Nhập thông tin chuyến bay gồm điểm đi, điểm đến, ngày khởi hành và số lượng hành khách.',
                    'Bước 2: Chọn chuyến bay phù hợp, xem chi tiết giá vé, hành lý và điều kiện đi kèm.',
                    'Bước 3: Nhập thông tin hành khách gồm: Họ và tên, số điện thoại, email.',
                    'Bước 4: Thanh toán bằng mã QR hoặc các phương thức hỗ trợ khác.',
                    'Bước 5: Vé máy bay sẽ được gửi qua email ngay sau khi thanh toán thành công.',
                ],
            },
            {
                id: '1.3',
                subtitle: 'Tìm khách sạn',
                content: [
                    'Bước 1: Nhập thông tin tìm kiếm gồm điểm đến, ngày nhận phòng, ngày trả phòng và số lượng khách.',
                    'Bước 2: Chọn khách sạn phù hợp, xem chi tiết phòng, giá cả và tiện ích đi kèm.',
                    'Bước 3: Nhập thông tin đặt phòng gồm: Họ và tên, số điện thoại, email.',
                    'Bước 4: Thanh toán để xác nhận đặt phòng.',
                    'Bước 5: Xác nhận đặt phòng sẽ được gửi qua email ngay sau khi thanh toán.',
                ],
            },
        ],
    },
    {
        id: '2',
        title: 'Quy trình hủy đơn hàng',
        sections: [
            {
                id: '2.1',
                subtitle: 'Hủy đặt tour',
                content: [
                    'Khách hàng có thể hủy đơn hàng bằng các cách sau:',
                    "Gửi yêu cầu hủy qua form 'Liên hệ' trên website.",
                    'Gửi email đến: support@tourx.com.',
                    'Gọi hotline: 0988 888 888.',
                    'Liên hệ nhân viên tư vấn phụ trách đơn hàng.',
                ],
                note: 'Chính sách hoàn tiền và phí hủy áp dụng theo quy định của từng tour.',
            },
            {
                id: '2.2',
                subtitle: 'Hủy vé máy bay',
                content: [
                    'Vé máy bay đã xuất không thể hủy trực tiếp trên website hoặc hệ thống hãng hàng không.',
                    'Khách hàng liên hệ nhân viên tư vấn để được hỗ trợ xử lý.',
                ],
            },
            {
                id: '2.3',
                subtitle: 'Hủy đặt khách sạn',
                content: [
                    'Chính sách hủy phòng phụ thuộc vào quy định của từng khách sạn.',
                    'Khách hàng liên hệ nhân viên tư vấn để được hỗ trợ.',
                ],
            },
        ],
    },
    {
        id: '3',
        title: 'Giải quyết phát sinh trong giao dịch',
        sections: [
            {
                id: '3.1',
                subtitle: '',
                content: [
                    'TourX cam kết tiếp nhận và xử lý khiếu nại liên quan đến giao dịch trên tourx.com.',
                    'Khi có tranh chấp, khách hàng vui lòng liên hệ qua hotline: 0988 888 888 hoặc email support@tourx.com.',
                    'TourX sẽ chủ động liên hệ để giải quyết nhanh chóng.',
                    'Tranh chấp được giải quyết trên tinh thần thương lượng. Nếu không đạt thỏa thuận, các bên có quyền đưa vụ việc ra Tòa án kinh tế.',
                    'Nếu tranh chấp xảy ra giữa khách hàng và nhà cung cấp dịch vụ, TourX sẽ hỗ trợ thông tin và bảo vệ quyền lợi hợp pháp của khách hàng.',
                ],
                note: 'Khi thực hiện giao dịch trên website, khách hàng cần tuân thủ đúng quy trình để đảm bảo quyền lợi.',
            },
        ],
    },
];

// Component displays each part of the tutorial
const UserManualSection = ({ id, title, sections }) => {
    return (
        <div id={`section-${id}`} className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
                {id}. {title}
            </h2>
            {sections.map((section) => (
                <div key={section.id} className="mt-4">
                    {section.subtitle && (
                        <h3 className="text-lg font-medium text-gray-700">
                            {section.id}. {section.subtitle}:
                        </h3>
                    )}
                    <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                        {section.content.map((step, stepIndex) => (
                            <li key={stepIndex}>{step}</li>
                        ))}
                    </ul>
                    {section.note && (
                        <p className="mt-2 text-red-500 text-sm italic">
                            <strong>Lưu ý:</strong> {section.note}
                        </p>
                    )}
                </div>
            ))}
        </div>
    );
};
//  Declare PropTypes to check input data
UserManualSection.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    sections: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            subtitle: PropTypes.string,
            content: PropTypes.arrayOf(PropTypes.string).isRequired,
            note: PropTypes.string,
        }),
    ).isRequired,
};

// Main component displays the user manual page
const UserManual = () => {
    return (
        <div className="min-h-screen p-5 bg-gray-50">
            <div className="max-w-8xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Hướng dẫn sử dụng website TourX</h1>
                <div className=" font-black text-sky-600 m-6">/ / / / / / </div>
                <TableOfContents items={userManualData} />
                {userManualData.map((manual) => (
                    <UserManualSection key={manual.id} id={manual.id} title={manual.title} sections={manual.sections} />
                ))}
            </div>
        </div>
    );
};

export default UserManual;
