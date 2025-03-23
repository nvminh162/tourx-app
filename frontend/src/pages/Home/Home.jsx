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
import PlaceCard from './../../components/PlaceCard/PlaceCard';
import config from '../../config';
import SeeMore from '../../components/SeeMore';
import Image from './../../components/Image/Image';
import News from '../../components/News/News';

// import serviceCruisesJson from '../../data/mocks/Services/cruises.json';
import { useEffect, useState } from 'react';
import { getAllCruises } from '../../services/cruiseService';
import { getAllUsers } from '../../services/userService'

const Home = () => {
    const [cruises, setCruises] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchUsers = async () => {
        try {
            const users = await getAllUsers();
            console.log("Users from API:", users);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu người dùng:", error);
        }
    };

    fetchUsers();

    useEffect(() => {
        const fetchCruises = async () => {
            try {
                setLoading(true);
                const result = await getAllCruises();
                setCruises(result);
                setError(false);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu du thuyền:", error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchCruises();
    }, []);

    return (
        <>
            <Hero className="relative" videoSrc={videoHaLongBay.halongbay} imageSrc={imgHero.halongbay}>
                <CruiseForm to={config.routes.cruise} className="absolute left-1/2 -translate-x-1/2 top-1/2 lg:top-auto -translate-y-1/2 container lg:max-w-5xl" />
            </Hero>
            <div className="lg:mt-32"></div>
            <SectionHeader
                title="Du thuyền mới và phổ biến nhất"
                description="Tận hưởng sự xa hoa và đẳng cấp tối đa trên du thuyền mới nhất và phổ biến nhất. Khám phá một hành trình tuyệt vời đưa bạn vào thế giới của sự sang trọng, tiện nghi và trải nghiệm không thể quên."
                titleSize={300}
                className="px-8 py-20"
            >
                {loading ? (
                    <div className="w-full flex justify-center items-center py-10">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-light"></div>
                    </div>
                ) : error || cruises.length === 0 ? (
                    <div className="w-full flex justify-center items-center py-10">
                        <div className="text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <h3 className="mt-4 text-xl font-medium text-gray-700">Không tìm thấy du thuyền nào</h3>
                            <p className="mt-2 text-gray-500">Hiện không có dữ liệu du thuyền. Vui lòng thử lại sau.</p>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 place-items-center">
                            {cruises.slice(0, 6).map((service) => (
                                <ServiceCard
                                    key={service.id}
                                    category={service.category}
                                    name={service.name}
                                    location={service.location}
                                    details={{
                                        launchYear: service.details ? service.details.launchYear : "N/A",
                                        material: service.details ? service.details.material : "N/A",
                                        rooms: service.details ? service.details.rooms : "N/A",
                                    }}
                                    originalPrice={service.originalPrice}
                                    price={service.price}
                                    image={service.image}
                                    rating={{ score: service.rating ? service.rating.score : 0, count: service.rating ? service.rating.count : 0 }}
                                    to={`/cruise${service.to}`}
                                />
                            ))}
                        </div>
                        <SeeMore title="Xem tất cả Du thuyền" to={config.routes.cruise} />
                    </>
                )}
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
                    {partnerCruisesJson.slice(0, 6).map((partner) => (
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
