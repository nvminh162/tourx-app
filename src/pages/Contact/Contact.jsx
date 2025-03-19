  import { useState } from 'react';
  import MapSection from '../../components/MapSection/MapSection';
  import ContactForm from '../../components/Form/Contact/ContactForm';
  import SuccessModal from '../../components/SuccessModal/SuccessModal';

  const Contact = () => {
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleSuccess = () => {
      setShowSuccessModal(true);
    };

    return (
      <div className="relative w-full min-h-screen">
        <MapSection />
        <div className="w-full max-w-2xl mx-auto px-4 md:px-0 mt-[-10rem] md:mt-[-15rem]">
            <ContactForm onSuccess={handleSuccess} />
        </div>
        {showSuccessModal && <SuccessModal onClose={() => setShowSuccessModal(false)} />}
      </div>
    );
  };

  export default Contact;