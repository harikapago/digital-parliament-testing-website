// import React, { useState } from 'react';
// import axios from 'axios';

// const Con = () => {
//   const [constituencyName, setConstituencyName] = useState('');
   
//   const handlePincodeChange = (event) => {
//     const pincode = event.target.value;

//     // Get the constituency name for the given pincode.
//     const constituencyNamePromise = axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
    
//     // Update the state with the constituency name.
//     constituencyNamePromise.then((response) => {
//       const constituencyName = response.data[0].PostOffice[0];
//       console.log(constituencyName)
//       console.log(response)
//       setConstituencyName(constituencyName);
//     });
//   };

//   return (
//     <div>
//       <h1>Get Constituency Name by Pincode</h1>
//       <input type="text" placeholder="Enter pincode" onChange={handlePincodeChange} />
//       <hr></hr>
//       <p>Constituency details:</p>
//       <p>Place Name: {constituencyName.Name}</p>
//       <p>District: {constituencyName.District}</p>

//       <p>Division: {constituencyName.Division}</p>
//       <p>Region:{constituencyName.Region}</p>
//       <p>Region:{constituencyName.State}</p>
//     </div>
//   );
// };

// export default Con;
// ----------------------------------------------------experimmented-------------------------------

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Con = (props) => {
  const [constituencyName, setConstituencyName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.postalpincode.in/pincode/${props.pinvalue}`);
        const firstPostOffice = response.data[0]?.PostOffice[0] || {};
        setConstituencyName(firstPostOffice);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [props.pinvalue]);

  return (
    <div>
      <h1>Get Location Details  by Pincode</h1>
      <input
        type="text"
        placeholder="Enter pincode"
        value={props.pinvalue}
        readOnly
      />
      <hr />
      {/* <p>Constituency details:</p> */}
      <p>Place Name: {constituencyName.Name}</p>
      <p>District: {constituencyName.District}</p>
      <p>Division: {constituencyName.Division}</p>
      <p>Region: {constituencyName.Region}</p>
      <p>State: {constituencyName.State}</p>
    </div>
  );
};

export default Con;


// ---------------------------------


