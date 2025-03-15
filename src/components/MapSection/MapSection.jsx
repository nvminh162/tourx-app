const MapSection = () => {
  const mapUrl = import.meta.env.VITE_GOOGLE_MAPS_URL;

  return (
      <div className="w-full h-[300px] md:h-[500px] lg:h-[700px] rounded-2xl overflow-hidden shadow-lg">
          <iframe
              src={mapUrl}
              className="w-full h-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
      </div>
  );
};

export default MapSection;
