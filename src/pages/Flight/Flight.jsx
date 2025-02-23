import imgHero from "~/assets/images/Hero";
import videoFight from "~/assets/videos/Flight";

import Hero from "~/components/Hero";

const Flight = () => (
    <>
        <Hero videoSrc={videoFight.flight} imageSrc={imgHero.flight}/>
        <div className="min-h-screen p-5 text-center bg-red-500">
            Flight page
        </div>
    </>
);

export default Flight;
