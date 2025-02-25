import Hero from '~/components/Hero';

import CruiseForm from '~/components/Form/Cruise';
import Feedback from '~/components/Feedback';
import SectionHeader from '~/components/SectionHeader';

import imgHero from '~/assets/images/Hero';
import videoHaLongBay from '~/assets/videos/HaLongBay';
import cruiseJson from '~/data/mocks/Feedback/cruise.json';

const Home = () => {
    return (
        <>
            <Hero className="relative" videoSrc={videoHaLongBay.halongbay} imageSrc={imgHero.halongbay}>
                <CruiseForm className="absolute left-1/2 -translate-x-1/2 top-1/2 lg:top-auto -translate-y-1/2 container lg:max-w-5xl" />
            </Hero>
            <div className="lg:mt-32"></div>
            <SectionHeader
                title="Du thuyền mới và phổ biến nhất"
                description="Tận hưởng sự xa hoa và đẳng cấp tối đa trên du thuyền mới nhất và phổ biến nhất. Khám phá một hành trình tuyệt vời đưa bạn vào thế giới của sự sang trọng, tiện nghi và trải nghiệm không thể quên."
                titleSize={300}
                className="px-8 py-20"
            >
                {/* List cruise here */}
            </SectionHeader>
            <SectionHeader
                title="Đánh giá từ những người đã trải nghiệm"
                description="Khách hàng chia sẻ về những kỷ niệm tuyệt vời trên chuyến du lịch với chúng tôi."
                titleSize={400}
                className="px-8 py-20"
            >
                <Feedback data={cruiseJson} />
            </SectionHeader>
            <SectionHeader
                title="Các điểm đến của TourX"
                description="Khám phá vẻ đẹp tuyệt vời của Du thuyền Hạ Long: Hành trình đến thiên đường thiên nhiên"
                className="px-8 py-20"
                reverse
            >
                {/* List tour places */}
            </SectionHeader>
            <SectionHeader
                title="Đối tác Cùng các Hãng Du thuyền Lớn"
                description="Đối tác hàng đầu với các hãng du thuyền danh tiếng: Ưu đãi độc quyền dành riêng cho bạn."
                titleSize={300}
                className="px-8 py-20"
            >
                {/* List flight logo here */}
            </SectionHeader>
            <SectionHeader
                title="Hạ Long: Khám phá Sự đặc sắc và Cập nhật tin tức mới nhất"
                description="Hạ Long: Bí mật và Cuộc sống trong Vịnh - Khám phá và Cập nhật những tin tức hấp dẫn từ điểm đến tuyệt vời này."
                titleSize={550}
                className="px-8 py-20"
            >
                {/* List ha long logo here */}
            </SectionHeader>
        </>
    );
};

export default Home;
