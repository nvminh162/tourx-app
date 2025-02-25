import imgHero from "~/assets/images/Hero";
import videoHotel from "~/assets/videos/Hotel";
import CruiseForm from "~/components/Form/Cruise";
import Hero from "~/components/Hero";

const Hotel = () => (
    <>
        <Hero className="relative" videoSrc={videoHotel.hotel} imageSrc={imgHero.halongbay}>
            <CruiseForm className="absolute left-1/2 -translate-x-1/2 top-1/2 lg:top-auto -translate-y-1/2 container lg:max-w-5xl" />
        </Hero>
        <div className="min-h-100"></div>
    </>
);

export default Hotel;
