import React, { useState, useEffect } from 'react';
import pincodeData from './pincodesdata.jsx';

const ConstituencyDetailsByPincode = ({ pincode }) => {
  const [constituencyDetails, setConstituencyDetails] = useState(null);
console.log(pincode)
useEffect(() => {
    const findConstituencyByPincode = () => {
      const details = pincodeData.find((data) =>
        data.location.pincodes
          .map((code) => code.toString())
          .includes(pincode.toString())
      );
  
      if (details) {
        setConstituencyDetails(details);
      } else {
        setConstituencyDetails(null);
      }
    };
  
    findConstituencyByPincode();
  }, [pincode]);
  
  
  return (
    <div>
      <h2>Constituency Details</h2>
      {constituencyDetails ? (
        <div>
          <p>Constituency Name: {constituencyDetails.constituencyName}</p>
          <p>MLA Name: {constituencyDetails.mlaName}</p>
          <p>MP Name: {constituencyDetails.mpName}</p>
          <p>Corporator Name: {constituencyDetails.corporatorName}</p>
          <p>Latitude: {constituencyDetails.location.latitude}</p>
          <p>Longitude: {constituencyDetails.location.longitude}</p>
        </div>
      ) : (
        <p>No constituency found for the given pincode</p>
      )}
    </div>
  );
};

export default ConstituencyDetailsByPincode;
