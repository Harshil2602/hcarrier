import React, { useState } from "react";
import mapboxgl from "mapbox-gl";
import axios from "axios";

mapboxgl.accessToken = "YOUR_MAPBOX_ACCESS_TOKEN";

const DistanceCalculator = () => {
  const [startCoordinates, setStartCoordinates] = useState([]);
  const [endCoordinates, setEndCoordinates] = useState([]);
  const [distance, setDistance] = useState(null);

  const calculateDistance = async () => {
    if (startCoordinates.length === 0 || endCoordinates.length === 0) {
      alert("Please enter valid coordinates.");
      return;
    }

    try {
      const response = await axios.get(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${startCoordinates[0]},${startCoordinates[1]};${endCoordinates[0]},${endCoordinates[1]}`,
        {
          params: {
            access_token: mapboxgl.accessToken,
          },
        }
      );

      const distanceInKilometers = (
        response.data.routes[0].distance / 1000
      ).toFixed(2);

      setDistance(distanceInKilometers);
    } catch (error) {
      console.error("Error calculating distance:", error);
      alert("An error occurred while calculating distance.");
    }
  };

  return (
    <div>
      <h1>Distance Calculator</h1>
      <div>
        <label>Start Coordinates:</label>
        <input
          type="text"
          placeholder="e.g., -73.985664,40.748817"
          onChange={(e) => setStartCoordinates(e.target.value.split(","))}
        />
      </div>
      <div>
        <label>End Coordinates:</label>
        <input
          type="text"
          placeholder="e.g., -74.006859,40.713269"
          onChange={(e) => setEndCoordinates(e.target.value.split(","))}
        />
      </div>
      <button onClick={calculateDistance}>Calculate Distance</button>
      {distance !== null && <p>Distance: {distance} kilometers</p>}
    </div>
  );
};

export default DistanceCalculator;
