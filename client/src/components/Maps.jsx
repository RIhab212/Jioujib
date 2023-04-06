import React, { useState } from "react";
import GoogleMapReact from "google-map-react";

const ButtonMaps = ({ setLocation }) => {
  const [showMap, setShowMap] = useState(false);
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

  const handleMapClick = ({ lat, lng }) => {
    setShowMap(false);
    setCoordinates({ lat, lng });
    setLocation(`${lat}, ${lng}`);
  };

  return (
    <>
      <button onClick={() => setShowMap(true)}>Afficher la carte</button>
      {showMap && (
        <div style={{ height: "400px", width: "100%" }}>
          <GoogleMapReact
            center={{ lat: 48.856614, lng: 2.3522219 }}
            defaultZoom={11}
            onClick={handleMapClick}
          />
        </div>
      )}
    </>
  );
};

const ExampleComponent = () => {
  const [location, setLocation] = useState("");

  const handleChange = (event) => setLocation(event.target.value);

  return (
    <div>
      <ButtonMaps setLocation={setLocation} />
      <div>
        <input
          type="text"
          id="location"
          placeholder="Localisation"
          value={location}
          onChange={handleChange}
          required
          className="l"
        />
      </div>
    </div>
  );
};

export default ExampleComponent;
