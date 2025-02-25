import CruiseForm from "~/components/Form/Cruise";
import imgUtils from "~/assets/images/utils";
import Button from "~/components/Button";


const Business = () => {
    return (
        <>
        <div className="py-20 flex items-center justify-center">
            <CruiseForm />
            {/* VMinh beo */}
        </div>
        <div className="max-w-7xl mx-auto px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
                <h1 className="text-4xl font-bold text-gray-900">
                    TourX - Tour Du thuyền Hạ Long:
                    <br />
                    Kết nối doanh nghiệp, khám phá vẻ đẹp tự nhiên
                </h1>
                <img className="mt-4" src={imgUtils.headingBorder} alt="spacing" />
                <p className="text-[18px] text-gray-600 font-medium mt-6">
                        Với sự trải nghiệm thực tế, Công ty TNHH Du lịch và Dịch vụ MixiVivu mong muốn đưa du thuyền Hạ Long
                        trở thành một lựa chọn đầu tiên cho doanh nghiệp.
                        Nhiều chương trình du lịch hấp dẫn, đa dạng được kết hợp sẽ đem đến cho quý doanh nghiệp sự hài lòng và thuận tiện.
                        Du thuyền Hạ Long cũng sẽ là một món quà tri ân vô cùng ý nghĩa dành cho nhân viên của quý doanh nghiệp.
                        Bên cạnh đó, du thuyền Hạ Long còn rất phù hợp cho những cuộc hội thảo,
                        hợp tác đầu tư hay giao lưu của quý doanh nghiệp.
                </p>
                <Button className="mt-6 py-3 px-6 bg-blue-500 text-white font-bold rounded-lg">
                    Liên hệ với TourX →
                </Button>
            </div>

            {/* Right content */}
            <div className="flex flex-col gap-6">
                {/* item 1 */}
                <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-lg">
                    <img className="w-24 h-24 rounded-lg" src={imgUtils.beer_sea} alt="Lịch trình phù hợp" />
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">Lịch trình phù hợp với yêu cầu của doanh nghiệp</h3>
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
                            Chúng tôi sẽ tư vấn cung cấp du thuyền phù hợp về số lượng phòng nghỉ, không gian boong tàu.
                        </p>
                    </div>
                </div>

                {/* item 3 */}
                <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-lg">
                    <img className="w-24 h-24 rounded-lg" src={imgUtils.HaLongBay} alt="Thời gian linh hoạt" />
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">Thời gian linh hoạt</h3>
                        <p className="text-[16px] text-gray-600">
                            Chúng tôi sẽ tư vấn thời gian linh hoạt nhất phù hợp với sự kiện làm việc trước và sau chuyến đi.
                        </p>
                    </div>
                </div>
            </div>
        </div>
            
            </>
    );
};

export default Business;
