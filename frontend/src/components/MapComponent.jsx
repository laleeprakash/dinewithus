const MapComponent = () => {
  return (
    <div className="mt-8">
      <h2 className="text-center text-2xl font-semibold">Find Us Here</h2>
      <div className="mt-4">
        <iframe
          width="100%"
          height="400"
          src="https://www.google.com/maps/embed?pb=YOUR_GOOGLE_MAPS_EMBED_LINK"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default MapComponent;
