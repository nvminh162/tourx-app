const MapSection = () => {
    const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.858237982653!2d106.68427047522368!3d10.822158889329383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174deb3ef536f31%3A0x8b7bb8b7c956157b!2sIndustrial%20University%20of%20Ho%20Chi%20Minh%20City!5e0!3m2!1sen!2s!4v1741966573439!5m2!1sen!2s"; // Fallback nếu env không có
  
    return (
      <div className="w-full h-[50vh] min-h-[300px] md:h-[60vh] lg:h-[70vh] rounded-2xl overflow-hidden shadow-lg">
        <iframe
          src={mapUrl}
          className="w-full h-full"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Bản đồ Mixivivu"
        />
      </div>
    );
  };
  
  export default MapSection;