import Hero from "~/components/Hero";

import imgHero from '~/assets/images/Hero';
import videoHaLongBay from "~/assets/videos/HaLongBay";

const Home = () => (
    <>
        <Hero videoSrc={videoHaLongBay.halongbay} imageSrc={imgHero.halongbay}/>
        <div className="min-h-[500px] p-5 text-center bg-amber-100">
            Home page
        </div>
    </>
);

export default Home;
