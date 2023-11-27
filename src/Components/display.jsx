import React, { useState } from 'react';
import constituencyData from './constcydata'; // Assuming the data is in the same directory

const LocationInfo2 = () => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [locationInfo, setLocationInfo] = useState(null);

  const findNearestLocation = () => {
    // Convert latitude and longitude to numbers
    const lat = parseFloat(latitude);
    const long = parseFloat(longitude);

    // Find the nearest location based on coordinates
    const nearestLocation = constituencyData.reduce((nearest, current) => {
      const currentLat = parseFloat(current.location.Latitude);
      const currentLong = parseFloat(current.location.Longitude);

      const distance = Math.sqrt(
        Math.pow(lat - currentLat, 2) + Math.pow(long - currentLong, 2)
      );

      if (!nearest || distance < nearest.distance) {
        return { location: current, distance };
      }

      return nearest;
    }, null);

    setLocationInfo(nearestLocation ? nearestLocation.location : null);
  };

  return (
    <div>
      <h2>Enter Latitude and Longitude</h2>
      <label>
        Latitude:
        <input
          type="text"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />
      </label>
      <label>
        Longitude:
        <input
          type="text"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />
      </label>
      <button onClick={findNearestLocation}>Find Location</button>

      {locationInfo && (
        <div>
          <h3>Location Information</h3>
          <p>Constituency: {locationInfo.constituencyName}</p>
          <p>MLA: {locationInfo.mlaName}</p>
          <p>MP: {locationInfo.mpName}</p>
        </div>
      )}
    </div>
  );
};

export default LocationInfo2;
