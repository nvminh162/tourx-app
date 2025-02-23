import imgFooter from '~/assets/images/Footer';
import imgUtils from '~/assets/images/utils';
import Image from '~/components/Image';

const Footer = () => {
    return (
        <>  
            <div className="w-full text-white bg-footer-dark">
                {/* footer 1 */}
                <div className="grid grid-cols-1 lg:grid-cols-6 max-w-7xl lg:gap-15 mx-auto py-16 lg:space-y-0 space-y-10">
                    {/* Item 1 */}
                    <div className="flex flex-col col-span-2 space-y-6 items-center lg:items-start text-center lg:text-left mx-5" > {/*Sub Item 1 */}
                        <Image className="object-cover h-20 w-55" src={imgUtils.logoTourX} />
                        <p>Công ty TNHH Du Lịch và Dịch Vụ Mixivivu</p>
                        <p>
                            Tầng 7, số nhà 25, ngõ 38 phố Yên Lãng, phường Láng Hạ, quận Đống Đa,
                            TP. Hà Nội
                        </p>
                        <p>
                            Mã số doanh nghiệp: 0110376372 do Sở Kế hoạch và Đầu tư Thành phố Hà Nội
                            cấp ngày 05/06/2023
                        </p>
                    </div>
                    {/* Item 2 */}
                    <div className="col-span-4"> 
                        {/*Sub Item 2 */}
                        <div className='grid grid-cols-1 lg:grid-cols-3'>
                            <div className='text-center'>Nav 1</div>
                            <div className='text-center'>Nav 2</div>
                            <div className='text-center'>Nav 3</div>
                        </div>
                    </div>
                </div>
            </div>
            {/* footer 2 */}
            <div className="select-none bg-footer-base text-footer-light">
                <div className="flex flex-col-reverse items-center justify-between py-8 mx-auto text-base md:flex-row max-w-7xl">
                    <div className="m-2">© 2025 IUH Eleven Group, Inc. All rights reserved.</div>
                    <div className="flex gap-5 m-2">
                        <Image className="h-[60px]" src={imgFooter.imgVerify} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Footer;