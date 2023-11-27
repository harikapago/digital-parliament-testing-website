import React from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import GrievanceForm from './Components/Greviance';
import LocationInfo from './Components/working/LocationInfo';
// import Address from './Components/Address';


import LocationInfo2 from './Components/display';



const App = () => {
  return (
   <div>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<GrievanceForm/>} />
      <Route path="/location" element={<LocationInfo/>} /> 
      {/* we get pincode from this location and sent to constituency.jsx */}
      <Route path="/display" element={<LocationInfo2/>} />
      {/* above display route depends on nearest constitunecy wich is giving errors */}
      
    </Routes>
    </BrowserRouter>
   </div>
  )
}

export default App