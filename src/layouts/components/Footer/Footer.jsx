import imgFooter from '~/assets/images/Footer';
import imgUtils from '~/assets/images/utils';
import Image from '~/components/Image';

const Footer = () => {
    return (
        <div className='select-none'>  
            <div className="w-full text-white bg-footer-dark">
                {/* footer 1 */}
                <div className="grid grid-cols-1 lg:grid-cols-6 max-w-7xl lg:gap-15 mx-auto py-16 lg:space-y-0 space-y-10">
                    {/* Item 1 */}
                    <div className="flex flex-col col-span-2 space-y-6 items-center lg:items-start text-center lg:text-left mx-5" > {/*Sub Item 1 */}
                        <Image className="object-cover h-20 w-55" src={imgUtils.logoTourX} />
                        <p>Công ty TNHH Du Lịch và Dịch Vụ Tour Explore - TourX</p>
                        <p>
                            12 Nguyễn Văn Bảo, Phường 1, Quận Gò Vấp, Thành phố Hồ Chí Minh
                        </p>
                        <p>
                            Mã số doanh nghiệp: 0353999798 do Sở Kế hoạch và Đầu tư Thành phố Hồ Chí Minh
                            cấp ngày 23/02/2025
                        </p>
                    </div>
                    {/* Item 2 */}
                    <div className="col-span-4"> 
                        {/*Sub Item 2 */}
                        <div className='grid grid-cols-1 lg:grid-cols-3'>
                            <div className='text-center'>FootNav 1</div>
                            <div className='text-center'>FootNav 2</div>
                            <div className='text-center'>FootNav 3</div>
                        </div>
                    </div>
                </div>
            </div>
            {/* footer 2 */}
            <div className="bg-footer-base text-footer-light">
                <div className="flex flex-col-reverse items-center justify-between py-8 mx-auto text-base md:flex-row max-w-7xl">
                    <div className="m-2">© 2025 Tour Explore Group - TourX Group, Inc. All rights reserved.</div>
                    <div className="flex gap-5 m-2">
                        <Image className="h-[60px]" src={imgFooter.imgVerify} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;