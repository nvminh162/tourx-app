import MapSection from '../../components/MapSection/MapSection';
import ContactForm from '../../components/Form/ContactForm';

const Contact = () => {
    return (
        <div className="relative w-full min-h-screen pb-80">
            <MapSection />
            <div className="absolute left-1/2 top-[70%] -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl px-4 md:px-0 max-h-[80vh] overflow-y-auto">
                <ContactForm />
            </div>
        </div>
    );
};

export default Contact;
