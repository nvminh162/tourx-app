import { useState, useEffect } from 'react';
import imgHero from '../../assets/images/Hero';
import videoHotel from '../../assets/videos/Hotel';
import Feedback from '../../components/Feedback';
import CruiseForm from '../../components/Form/Cruise';
import Hero from '../../components/Hero';
import SectionHeader from '../../components/SectionHeader';
import ServiceCard from '../../components/ServiceCard';

import partnerCruisesJson from '../../data/mocks/Partners/cruises.json';
import placesProvincesJson from '../../data/mocks/Places/provinces.json';
import feedbackHotelsJson from '../../data/mocks/Feedback/hotels.json';
import PlaceCard from '../../components/PlaceCard/PlaceCard';
import Image from '../../components/Image';
import SeeMore from '../../components/SeeMore';
import config from '../../config';

// Import the hotel service instead of static JSON
import { getAllHotels } from '../../services/hotelService';

const Hotel = () => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                setLoading(true);
                const result = await getAllHotels();
                setHotels(result);
                setError(false);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu khách sạn:", error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchHotels();
    }, []);

    return (
        <>
            <Hero className="relative" videoSrc={videoHotel.hotel} imageSrc={imgHero.halongbay}>
                <CruiseForm className="absolute left-1/2 -translate-x-1/2 top-1/2 lg:top-auto -translate-y-1/2 container lg:max-w-5xl" to={config.routes.cruise}/>
            </Hero>
            <div className="lg:mt-32"></div>
            <SectionHeader
                id="hotel"
                title="Khám phá và trải nghiệm tất cả dịch vụ tuyệt vời nhất từ các khách sạn trên mọi miền đất nước cùng TourX."
                description="Không gian nghỉ dưỡng sang trọng, tiện nghi và hiện đại cùng dịch vụ chuyên nghiệp, TourX tự hào mang đến những trải nghiệm hoàn hảo cho kỳ nghỉ của bạn, giúp bạn tận hưởng từng khoảnh khắc một cách đáng nhớ và trọn vẹn nhất!"
                titleSize={482}
                className="px-8 py-20"
            >
                {loading ? (
                    <div className="w-full flex justify-center items-center py-10">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-light"></div>
                    </div>
                ) : error || hotels.length === 0 ? (
                    <div className="w-full flex justify-center items-center py-10">
                        <div className="text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <h3 className="mt-4 text-xl font-medium text-gray-700">Không tìm thấy khách sạn nào</h3>
                            <p className="mt-2 text-gray-500">Hiện không có dữ liệu khách sạn. Vui lòng thử lại sau.</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 place-items-center">
                        {hotels.map((service, index) => (
                            <ServiceCard
                                key={service.id || `hotel-${index}`}
                                category={service.category}
                                name={service.name}
                                location={service.location}
                                details={{
                                    launchYear: service.details?.launchYear,
                                    material: service.details?.material,
                                    rooms: service.details?.rooms,
                                }}
                                originalPrice={service.originalPrice}
                                price={service.price}
                                image={service.image}
                                rating={{ score: service.rating?.score || 0, count: service.rating?.count || 0 }}
                                to={`/hotel${service.to}`}
                            />
                        ))}
                    </div>
                )}
            </SectionHeader>
            <SectionHeader
                title="Đánh giá từ những người đã trải nghiệm"
                description="Khách hàng chia sẻ về những kỷ niệm tuyệt vời trên chuyến du lịch với chúng tôi."
                titleSize={400}
                className="px-8 py-20"
            >
                <Feedback data={feedbackHotelsJson} />
            </SectionHeader>
            <SectionHeader
                title="Các điểm đến của TourX"
                description="Trải nghiệm sự sang trọng và thư giãn tại Khách sạn: Hành trình đến thiên đường nghỉ dưỡng hoàn hảo"
                className="px-8 py-20"
                reverse
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 place-items-center">
                    {placesProvincesJson.map((place) => (
                        <PlaceCard key={place.id} name={place.name} image={place.image} to={place.to} />
                    ))}
                </div>
            </SectionHeader>
            <SectionHeader
                title="Đối tác Cùng các Khách Sạn Lớn"
                description="Đối tác hàng đầu với các khách sạn danh tiếng: Ưu đãi độc quyền dành riêng cho bạn"
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
                title="Khám phá Sự đặc sắc và Cập nhật tin tức mới nhất"
                description="Những điểm đến hấp dẫn cùng nhiều thông tin cần thiết cho chuyến du lịch tuyệt vời của bạn."
                titleSize={400}
                className="px-8 py-20"
            >
                <SeeMore title="Xem tất cả" to={config.routes.notfound} />
            </SectionHeader>
        </>
    );
};

export default Hotel;