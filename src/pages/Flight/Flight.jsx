import imgHero from '../../assets/images/Hero';
import videoFight from '../../assets/videos/Flight';
import Feedback from '../../components/Feedback';
import FlightForm from '../../components/Form/Flight/FlightForm';

import Hero from '../../components/Hero';
import Image from '../../components/Image';
import SectionHeader from '../../components/SectionHeader';
import partnerFlightsJson from '../../data/mocks/Partners/flights.json';
import feedbackFlightJson from '../../data/mocks/Feedback/flights.json';

const Flight = () => {

    return (
        <>
            <Hero className="relative" videoSrc={videoFight.flight} imageSrc={imgHero.flight}>
                <FlightForm
                    className="absolute left-1/2 -translate-x-1/2 top-1/2 lg:top-auto -translate-y-1/2 container lg:w-6xl"
                />
            </Hero>
            <div className="lg:mt-52"></div>
            <SectionHeader
                title="Đánh giá từ những người đã trải nghiệm"
                description="Khách hàng chia sẻ về những kỷ niệm tuyệt vời trên chuyến du lịch với chúng tôi."
                titleSize={400}
                className="px-8 py-20"
            >
                <Feedback data={feedbackFlightJson} />
            </SectionHeader>
            <SectionHeader
                title="Đối tác Cùng các Hãng máy bay lớn"
                description="Đối tác hàng đầu với các hãng máy bay lớn: Ưu đãi độc quyền dành riêng cho bạn"
                titleSize={300}
                className="px-8 py-20"
            >
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 place-items-center group">
                    {partnerFlightsJson.slice(0, 5).map((partner) => (
                        <Image
                            key={partner.id}
                            src={partner.image}
                            alt={partner.id}
                            className="max-w-[217px] max-h-[64px] object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                        />
                    ))}
                </div>
            </SectionHeader>
        </>
    )
};

export default Flight;
