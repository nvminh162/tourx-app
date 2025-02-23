import imgHero from "~/assets/images/Hero";
import videoHotel from "~/assets/videos/Hotel";
import Hero from "~/components/Hero";

const Hotel = () => (
    <>
        <Hero videoSrc={videoHotel.hotel} imageSrc={imgHero.halongbay}/>
        <div className="min-h-screen p-5 text-center bg-red-500">
            Hotel page
        </div>
    </>
);

export default Hotel;
