import { useState } from "react";
import EmailLinkify from "../../components/EmailLinkify/EmailLinkify";

const termsData = [
    {
        id: '1',
        title: 'Điều khoản chung',
        sections: [
            {
                id: '1.1',
                subtitle: 'Đồng ý với các điều khoản sử dụng',
                content: [
                    'Khi sử dụng Website Thương mại Điện tử TourX.com (sau đây gọi tắt là “Website”), Quý khách ' +
                    'đã mặc nhiên chấp thuận các điều khoản và điều kiện sử dụng (sau đây gọi tắt là “Điều kiện Sử dụng”) ' +
                    'được quy định dưới đây. Để biết được các sửa đổi mới nhất, Quý khách nên thường xuyên kiểm tra lại ' +
                    '“Điều kiện Sử dụng”. Chúng tôi có quyền thay đổi, điều chỉnh, thêm hay bớt các nội dung của “Điều kiện ' +
                    'Sử dụng” tại bất kỳ thời điểm nào. Nếu Quý khách vẫn tiếp tục sử dụng Website sau khi có các thay ' +
                    'đổi như vậy thì có nghĩa là Quý khách đã chấp thuận các thay đổi đó.',
                ],
            },
            {
                id: '1.2',
                subtitle: 'Các thông tin hiển thị',
                content: [
                    'Các nội dung hiển thị trên Website nhằm mục đích cung cấp thông tin về du thuyền Hạ Long, ' +
                    'chuyến bay, giờ bay, lịch bay và giá vé của các hãng hàng không trong nước và quốc tế, về ' +
                    'dịch vụ vận chuyển hành khách, hành lý và hàng hóa của hãng, dịch vụ khách sạn, cũng như ' +
                    'các dịch vụ bổ trợ khác liên quan đến du lịch, lữ hành của nhiều nhà cung cấp khác nhau ' +
                    '(sau đây được gọi chung là “Nhà Cung Cấp”).',
                ],
            },
        ],
    },
    {
        id: '2',
        title: 'Chính sách bảo hành/bảo trì',
        sections: [
            {
                id: '2.1',
                subtitle: '',
                content: [
                    'Sản phẩm giao dịch giữa TourX.com và khách hàng là dịch vụ, nên không áp dụng chính sách bảo hành/bảo trì.'
                ],
            },
        ],
    },
    {
        id: '3',
        title: 'Miễn trừ trách nhiệm',
        sections: [
            {
                id: '3.1',
                subtitle: '',
                content: [
                    'TourX.com và các nhà cung cấp khác cũng từ chối trách nhiệm hay đưa ra đảm bảo tằng ' +
                    'website sẽ không có lỗi vận hành, an toàn, không bị gián đoạn hay bất cứ đảm bảo nào về ' +
                    'tính chính xác, đầy đủ và đúng hạn của các thông tin hiển thị.',
                    'Khi truy cập vào website này, quý khách mặc nhiên đồng ý rằng TourX, các nhà cung ' +
                    'cấp khác cũng với đối tác liên kết không chịu bất cứ trách nhiệm nào liên quan đến thương ' +
                    'tật, mất mát, khiếu kiên, thiện hại trực tiếp hoặc gián tiếp do không lường trước dưới ' +
                    'bất kỳ hình thức nào phát sinh hay có liên quan đến việc',
                    {
                        list: [
                            'a. Sử dụng các thông tin trên website này',
                            'b. Các truy cập kết nối từ website này',
                            'c. Đăng ký thành viên, đăng ký nhận thư điện tự hay tham gia chương trình khách hàng thường xuyên',
                            'd. Các hạn chế liên quan đến đặt chỗ trực tuyến mô tả tại đây.',
                        ]
                    },
                    'Các điều kiện và hạn chế nêu trên chỉ có hiệu lực trong khuôn khổ pháp luật hiện hành.',
                ],
            },
        ],
    },
    {
        id: '4',
        title: 'Thông tin về các sản phẩm dịch vụ',
        sections: [
            {
                id: '4.1',
                subtitle: 'Du thuyền Hạ Long',
                content: [
                    '- Dịch vụ nghỉ dưỡng trên du thuyền tại vịnh Hạ Long là một sản phẩm dịch vụ nên không áp dụng các chính sách dùng thử, bảo hành, bảo trì.',
                    '- Các dịch vụ đặt phòng tại website đều không thể hoàn, hủy và chỉ có thể đổi ngày đi trong điều ' +
                    'kiện các du thuyền còn các hạng phòng tương tự hoặc quý khách có thể trả thêm phí chênh lệch các ' +
                    'hạng phòng.',
                    '- Trường hợp thời tiết xấu có Công văn của Ban Quản lý Vịnh Hạ Long cấm không cho du thuyền ngủ ' +
                    'đêm hoạt động, quý khách sẽ được đổi ngày trên cơ sở thỏa thuận giữa các bên.',
                ],
            },
            {
                id: '4.2',
                subtitle: 'Vé máy bay',
                content: [
                    'Sau khi quý khách thanh toán, vé máy bay của quý khách sẽ được gửi tới địa chỉ email mà quý ' +
                    'khách đăng ký. Trường hợp, quý khách không nhận được vé như đã thanh toán, quý khách vui lòng ' +
                    'liên hệ số hotline: 0353 999 999 hoặc gửi email: tourxcskh@gmail.com để yêu cầu sự hỗ trợ.',
                    'Mọi yêu cầu về thay đổi vé, hoàn vé, quý khách vui lòng liên hệ với chúng tôi theo số hotline ' +
                    'và email được công bố trên website để được trợ giúp nhanh nhất.',
                ],
            },
        ],
    },
    {
        id: '5',
        title: 'Trách nhiệm của Ban quản lý website',
        sections: [
            {
                id: '5.1',
                subtitle: '',
                content: [
                    'Cam kết cung cấp cho khách hàng nội dung, thông tin đúng như các nhà cung cấp đã đưa ra.',
                    'Tư vấn, giải đáp các thắc mắc của quý khách một cách chính xác và nhanh nhất.',
                    'Bảo mật thông tin của quý khách hàng.',
                    'Tuân thủ các quy định của pháp luật về thanh toán, quảng cáo, khuyến mại và bảo vệ quyền lợi ' +
                    'của người tiêu dùng và các quy định của pháp luật có liên quan khác khi bán hàng hóa hoặc ' +
                    'cung ứng dịch vụ trên sàn giao dịch thương mại điện tử.'
                ],
            },
        ],
    },
    {
        id: '6',
        title: 'Nghĩa vụ của khách hàng khi sử dụng website',
        sections: [
            {
                id: '6.1',
                subtitle: '',
                content: [
                    'Quý khách vui lòng cung cấp đầy đủ thông tin khi đặt dịch vụ trên website: họ và tên, số ' +
                    'điện thoại, địa chỉ email. Chúng tôi không chịu trách nhiệm nếu quý khách cung cấp sai thông ' +
                    'tin khi đặt dịch vụ hay đặt vé máy bay và thanh toán trực tuyến.',
                    'Tuyệt đối không sử dụng các hình thức hoặc công cụ nào nhằm làm thay đổi dữ liệu hay mục đích phá ' +
                    'hoại website. Mọi vi phạm sẽ bị xử lý theo pháp luật.',
                ],
            },
        ],
    },
];

const TermsSection = ({ id, title, sections }) => {
    return (
        <div id={`section-${id}`} className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
                {id}. {title}:
            </h2>
            {sections.map((section) => (
                <div key={section.id} className="mt-4">
                    {section.subtitle && (
                        <h3 className="text-lg font-medium text-gray-700">
                            {section.id}. {section.subtitle}:
                        </h3>
                    )}
                    <div className="text-gray-600 mt-2 space-y-2">
                        {section.content.map((step, stepIndex) => {return (
                                <div key={`${section.id}-${stepIndex}`}>
                                    {
                                        step.list? 
                                        <div key={stepIndex}>
                                            {step.list.map((subStep, listIndex) => (
                                                <div key={listIndex}><EmailLinkify text={subStep}/></div>
                                            ))}
                                        </div>:
                                        <div key={stepIndex}><EmailLinkify text={step}/></div>
                                    }
                                </div>
                            )})
                        }
                    </div>
                </div>
            ))}
        </div>
    );
};

const Terms = () => {
    return (
        <div className="min-h-screen p-5 bg-gray-50">
            <div className="max-w-8xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Điều khoản và điều kiện</h1>
                <img src="/src/assets/images/utils/heading-border.webp" alt="Error"/>
                <div className="text-gray-600 mt-2 space-y-1">
                    Website này thuộc quyền sở hữu và quản lý của Công ty TNHH Du lịch và Dịch vụ Tour Explore - TourX. 
                    Khi truy cập và sử dụng website này, bạn đồng ý rằng đã đọc, hiểu các điều kiện và điều 
                    khoản dưới đây. Chính vì vậy, bạn cần đọc rõ và sử dụng tiếp.
                </div>
                <div className="text-gray-600 mt-2 space-y-1">
                    Điều khoản và điều kiện trên e-tour-app.vercel.app bao gồm những nội dung sau:
                </div>
                {termsData.map((term) => (
                    <TermsSection key={term.id} id={term.id} title={term.title} sections={term.sections} />
                ))}
            </div>
        </div>
    );
};

export default Terms;
