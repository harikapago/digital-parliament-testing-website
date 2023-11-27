import React, { useState, useEffect } from "react";
import Con from "./constituency";
import ConstituencyDetailsByPincode from "./pincodedisplay";


// const apikey =AIzaSyAv0p6fs2O9UC3eCxTGyWC-gS1QOOphR3Y;
const LocationInfo = () => {
  const [locationData, setLocationData] = useState(null);
  const [Address,setAddress]=useState();
  const [pincode,setPincode]=useState("");

  useEffect(() => {
    // Check if the Geolocation API is available in the browser
    if (navigator.geolocation) {
      // Get the current position
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
console.log(longitude,latitude);
          // Use latitude and longitude to fetch location information from a reverse geocoding API
          //  opencage api 
const reverseGeocodingApi = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=8bbcc4b117db4c3f9c0bdc4c959bfdd0`;
 
// const reverseGeocodingApi = `https://api.opencagedata.com/geocode/v1/json?q=17.4106+78.4652&key=8bbcc4b117db4c3f9c0bdc4c959bfdd0`;


          fetch(reverseGeocodingApi)
            .then((response) => response.json())
            .then((data) => {
              setLocationData(data.results[0].components);
              console.log(data);
              console.log(data.results[0].components);

             
              
          // Filter items with 'postal_code' in the 'types' array
           const postalCodeData = data.results[0].components.postcode;

          // Log the filtered data
            console.log(postalCodeData);
            setPincode(postalCodeData)


               setAddress(data.results[0]);

 

            })
            .catch((error) => {
              console.error("Error fetching location data:", error);
            });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported in this browser.");
    }
  }, []); // Empty dependency array ensures the effect runs only once



  return (
    <> <div>
      <h2>Location Information</h2>
     
          
          


    </div>

    <Con pinvalue={pincode}/>
    <ConstituencyDetailsByPincode pincode={pincode}/>
   </>
  );
};

export default LocationInfo;



// ---------------------------------------working above----------------------------
