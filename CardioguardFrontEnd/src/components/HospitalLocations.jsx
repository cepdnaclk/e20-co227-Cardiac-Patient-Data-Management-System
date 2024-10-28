import { useState, useCallback } from "react";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

// Define container style for the Google Map
const containerStyle = {
  width: "100%",
  height: "500px",
};

// Center the map over Sri Lanka
const center = {
  lat: 7.8731,
  lng: 80.7718,
};

// Predefined list of hospital locations
const hospitalLocations = [
  {
    id: 1,
    name: "National Hospital of Sri Lanka",
    position: { lat: 6.9271, lng: 79.8612 },
  },
  {
    id: 2,
    name: "Teaching Hospital Karapitiya",
    position: { lat: 6.0535, lng: 80.221 },
  },
  {
    id: 3,
    name: "Sri Jayewardenepura General Hospital",
    position: { lat: 6.888, lng: 79.9602 },
  },
  {
    id: 4,
    name: "Kandy General Hospital",
    position: { lat: 7.2939, lng: 80.6372 },
  },
  {
    id: 5,
    name: "Jaffna Teaching Hospital",
    position: { lat: 9.6615, lng: 80.0249 },
  },
  // Add more hospital locations as needed
];

function HospitalLocations() {
  const [map, setMap] = useState(null);

  // Callback to handle the map load event
  const onLoad = useCallback(function callback(map) {
    // Store the map instance in the state
    setMap(map);
  }, []);

  // Callback to handle the map unmount event
  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center bg-blue-600 text-white">
        Hospitals in Sri Lanka
      </h2>

      {/* Load the Google Map */}
      <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={8}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {/* Loop through the hospital locations and place markers on the map */}
          {hospitalLocations.map((hospital) => (
            <Marker
              key={hospital.id}
              position={hospital.position}
              title={hospital.name}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default HospitalLocations;
