import Hero from '~/components/Hero';

import imgHero from '~/assets/images/Hero';
import videoHaLongBay from '~/assets/videos/HaLongBay';
import CruiseForm from '~/components/Form/Cruise';
import imgUtils from '~/assets/images/utils';
import Button from '~/components/Button';

const Home = () => {
    return (
        <>
            <Hero className="relative" videoSrc={videoHaLongBay.halongbay} imageSrc={imgHero.halongbay}>
                <CruiseForm className="absolute left-1/2 -translate-x-1/2 top-1/2 lg:top-auto -translate-y-1/2" />
            </Hero>
            {/* Introduce */}
            <div className="max-w-7xl mx-auto lg:mt-32 px-8 py-20 grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="col-span-3 text-4xl font-bold w-72 text-gray-900">
                    <h1>Du thuyền mới và phổ biến nhất</h1>
                    <img className="mt-8" src={imgUtils.headingBorder} alt="spacing" />
                </div>
                <div className="col-span-2 text-[18px] text-gray-600 font-medium">
                    Tận hưởng sự xa hoa và đẳng cấp tối đa trên du thuyền mới nhất và phổ biến nhất. Khám phá một hành
                    trình tuyệt vời đưa bạn vào thế giới của sự sang trọng, tiện nghi và trải nghiệm không thể quên.
                </div>
            </div>
            {/* Rating */}
            <div className="max-w-7xl grid grid-cols-1 gap-5 lg:gap-20 px-8 py-20 mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    <div className="col-span-3 text-4xl font-bold w-96 text-gray-900">
                        <h1>Đánh giá từ những người đã trải nghiệm</h1>
                        <img className="mt-8" src={imgUtils.headingBorder} alt="spacing" />
                    </div>
                    <div className="col-span-2 text-[18px] text-gray-600 font-medium">
                        Khách hàng chia sẻ về những kỷ niệm tuyệt vời trên chuyến du lịch với chúng tôi.
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-5">
                    <img className="w-8 h-8" src={imgUtils.quote} alt="spacing" />
                    <div className="font-medium">
                        <h3 className="font-bold text-xl text-gray-900">Du thuyền Stellar of the Seas</h3>
                        <p className="text-[18px] text-gray-600 mb-6 mt-2">
                            Chị ưng dịch vụ này.
                        </p>
                        <p className="uppercase font-bold text-16px">Anh Tấn Minh</p>
                    </div>
                </div>
                <div className="flex gap-5 flex-wrap">
                    <Button className="py-2 px-4 shadow-xl bg-gray-100">Anh Tấn Minh</Button>
                    <Button className="py-2 px-4 shadow-xl bg-gray-100">Anh Tấn Minh</Button>
                    <Button className="py-2 px-4 shadow-xl bg-gray-100">Anh Tấn Minh</Button>
                    <Button className="py-2 px-4 shadow-xl bg-gray-100">Anh Tấn Minh</Button>
                </div>
            </div>
        </>
    );
};

export default Home;
