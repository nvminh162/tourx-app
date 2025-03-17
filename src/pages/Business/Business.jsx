import CruiseForm from '../../components/Form/Cruise';
import imgUtils from '../../assets/images/utils';
import Button from '../../components/Button';
import SectionHeader from '../../components/SectionHeader';
import Image from '../../components/Image';

import partnerCruisesJson from '../../data/mocks/Partners/cruises.json';

const Business = () => {
    return (
        <div className="max-w-7xl mx-auto py-20 px-8 space-y-24">
            <div className="flex items-center justify-center">
                <CruiseForm className="w-full" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                {/* left content */}
                <div className="cols-span-1 lg:col-span-3">
                    <h1 className="text-4xl font-bold text-gray-900">
                        TourX - Tour Du thuyền Hạ Long:
                        <br />
                        Kết nối doanh nghiệp, khám phá vẻ đẹp tự nhiên
                    </h1>
                    <img className="mt-4" src={imgUtils.headingBorder} alt="spacing" />
                    <p className="text-[18px] text-gray-600 font-medium mt-6">
                        Với sự trải nghiệm thực tế, Công ty TNHH Du lịch và Dịch vụ MixiVivu mong muốn đưa du thuyền Hạ
                        Long trở thành một lựa chọn đầu tiên cho doanh nghiệp. Nhiều chương trình du lịch hấp dẫn, đa
                        dạng được kết hợp sẽ đem đến cho quý doanh nghiệp sự hài lòng và thuận tiện. Du thuyền Hạ Long
                        cũng sẽ là một món quà tri ân vô cùng ý nghĩa dành cho nhân viên của quý doanh nghiệp. Bên cạnh
                        đó, du thuyền Hạ Long còn rất phù hợp cho những cuộc hội thảo, hợp tác đầu tư hay giao lưu của
                        quý doanh nghiệp.
                    </p>

                    <br />

                    <Button primary rounded className="col-span-1 lg:col-span-5 py-3 min-w-[200px]">
                        Liên hệ với TourX
                    </Button>
                </div>
                {/* Right content */}
                <div className="cols-span-1 lg:col-span-2">
                    {/* item 1 */}
                    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-lg">
                        <img className="w-24 h-24 rounded-lg" src={imgUtils.beer_sea} alt="Lịch trình phù hợp" />
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">
                                Lịch trình phù hợp với yêu cầu của doanh nghiệp
                            </h3>
                            <p className="text-[16px] text-gray-600">
                                Du thuyền sẽ sắp xếp lịch trình phù hợp với từng sự kiện của doanh nghiệp.
                            </p>
                        </div>
                    </div>

                    {/* item 2 */}
                    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-lg">
                        <img className="w-24 h-24 rounded-lg" src={imgUtils.titanic} alt="Đa dạng trong lựa chọn" />
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Đa dạng trong sự lựa chọn các du thuyền</h3>
                            <p className="text-[16px] text-gray-600">
                                Chúng tôi sẽ tư vấn cung cấp du thuyền phù hợp về số lượng phòng nghỉ, không gian boong
                                tàu.
                            </p>
                        </div>
                    </div>

                    {/* item 3 */}
                    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-lg">
                        <img className="w-24 h-24 rounded-lg" src={imgUtils.HaLongBay} alt="Thời gian linh hoạt" />
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Thời gian linh hoạt</h3>
                            <p className="text-[16px] text-gray-600">
                                Chúng tôi sẽ tư vấn thời gian linh hoạt nhất phù hợp với sự kiện làm việc trước và sau
                                chuyến đi.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <SectionHeader
                title="Khách hàng của TourX"
                description="TourX mang đến một trải nghiệm hoàn toàn mới, trải nghiệm đẳng cấp 5 sao cho khách hàng"
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
        </div>
    );
};

export default Business;
