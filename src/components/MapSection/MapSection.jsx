const MapSection = () => {
    const mapUrl = import.meta.env.VITE_GOOGLE_MAPS_URL || 'https://www.google.com/maps/embed?...'; // Fallback nếu env không có
  
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