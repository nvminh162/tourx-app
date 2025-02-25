import Hero from '../../components/Hero';

import imgHero from '../../assets/images/Hero';
import videoHaLongBay from '../../assets/videos/HaLongBay';
import CruiseForm from '../../components/Form/Cruise';

const Cruise = () => (
    <>
        <Hero className="relative" videoSrc={videoHaLongBay.halongbay} imageSrc={imgHero.halongbay}>
            <CruiseForm className="absolute left-1/2 -translate-x-1/2 top-1/2 lg:top-auto -translate-y-1/2 container lg:max-w-5xl" />
        </Hero>
        <div className="min-h-100"></div>
    </>
);

export default Cruise;
