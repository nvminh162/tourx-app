import Hero from '~/components/Hero';

import imgHero from '~/assets/images/Hero';
import videoHaLongBay from '~/assets/videos/HaLongBay';

const Cruise = () => (
    <>
        <Hero videoSrc={videoHaLongBay.halongbay} imageSrc={imgHero.halongbay} />
        <div className="min-h-[400px] p-5 text-center bg-red-300">Cruise page</div>
    </>
);

export default Cruise;
