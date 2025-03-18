import Hero from '../../components/Hero';

import CruiseForm from '../../components/Form/Cruise';
import Feedback from '../../components/Feedback';
import SectionHeader from '../../components/SectionHeader';

import imgHero from '../../assets/images/Hero';
import videoHaLongBay from '../../assets/videos/HaLongBay';
import ServiceCard from '../../components/ServiceCard';

import newsJson from '../../data/mocks/News/news.json';
import placesHaLongBayJson from '../../data/mocks/Places/halongbay.json';
import partnerCruisesJson from '../../data/mocks/Partners/cruises.json';
import feedbackCruiseJson from '../../data/mocks/Feedback/cruises.json';
import serviceCruisesJson from '../../data/mocks/Services/cruises.json';
import PlaceCard from './../../components/PlaceCard/PlaceCard';
import config from '../../config';
import SeeMore from '../../components/SeeMore';
import Image from './../../components/Image/Image';
import News from '../../components/News/News';

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
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 place-items-center">
                    {serviceCruisesJson.map((service) => (
                        <ServiceCard
                            key={service.id}
                            category={service.category}
                            name={service.name}
                            location={service.location}
                            details={{
                                launchYear: service.details.launchYear,
                                material: service.details.material,
                                rooms: service.details.rooms,
                            }}
                            originalPrice={service.originalPrice}
                            price={service.price}
                            image={service.image}
                            rating={{ score: service.rating.score, count: service.rating.count }}
                            to={`/cruise${service.to}`}
                        />
                    ))}
                </div>
                <SeeMore title="Xem tất cả Du thuyền" to={config.routes.notfound} />
            </SectionHeader>
            <SectionHeader
                title="Đánh giá từ những người đã trải nghiệm"
                description="Khách hàng chia sẻ về những kỷ niệm tuyệt vời trên chuyến du lịch với chúng tôi."
                titleSize={400}
                className="px-8 py-20"
            >
                <Feedback data={feedbackCruiseJson} />
            </SectionHeader>
            <SectionHeader
                title="Các điểm đến của TourX"
                description="Khám phá vẻ đẹp tuyệt vời của Du thuyền Hạ Long: Hành trình đến thiên đường thiên nhiên"
                className="px-8 py-20"
                reverse
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 place-items-center">
                    {placesHaLongBayJson.map((place) => (
                        <PlaceCard key={place.id} name={place.name} image={place.image} to={place.to} />
                    ))}
                </div>
            </SectionHeader>
            <SectionHeader
                title="Đối tác Cùng các Hãng Du thuyền Lớn"
                description="Đối tác hàng đầu với các hãng du thuyền danh tiếng: Ưu đãi độc quyền dành riêng cho bạn."
                titleSize={300}
                className="px-8 py-20"
            >
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5 place-items-center group">
                    {partnerCruisesJson.slice(0,6).map((partner) => (
                        <Image
                            key={partner.id}
                            src={partner.image}
                            alt={partner.id}
                            className="max-w-[176px] max-h-[64px] object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                        />
                    ))}
                </div>
            </SectionHeader>
            <SectionHeader
                title="Hạ Long: Khám phá Sự đặc sắc và Cập nhật tin tức mới nhất"
                description="Hạ Long: Bí mật và Cuộc sống trong Vịnh - Khám phá và Cập nhật những tin tức hấp dẫn từ điểm đến tuyệt vời này."
                titleSize={550}
                className="px-8 py-20"
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 place-items-center">
                    {newsJson.slice(0, 3).map((item) => (
                        <News
                            key={item.id}
                            title={item.title}
                            description={item.description}
                            date={item.date}
                            image={item.image}
                            to={item.to}
                        />
                    ))}
                </div>
                <SeeMore title="Xem tất cả" to={config.routes.notfound} />
            </SectionHeader>
        </>
    );
};

export default Home;
