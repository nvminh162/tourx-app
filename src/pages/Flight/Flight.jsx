import imgHero from '../../assets/images/Hero';
import videoFight from '../../assets/videos/Flight';
import CruiseForm from '../../components/Form/Cruise';

import Hero from '../../components/Hero';

const Flight = () => (
    <>
        <Hero className="relative" videoSrc={videoFight.flight} imageSrc={imgHero.flight}>
            <CruiseForm className="absolute left-1/2 -translate-x-1/2 top-1/2 lg:top-auto -translate-y-1/2 container lg:max-w-5xl" />
        </Hero>
        <div className="min-h-100"></div>
    </>
);

export default Flight;
