import React from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import GrievanceForm from './Components/Greviance';
import LocationInfo from './Components/working/LocationInfo';
import Login from "./Components/MLApages/login";
// import Address from './Components/Address';


import LocationInfo2 from './Components/display';
import Mlagrievances from './Components/MLApages/mlagrievances';
import Clearinggrievance from './Components/MLApages/clearinggrievance';
import Normaluser from './Components/MLApages/Normaluser';



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

      <Route path="/login" element={<Login/>} />
      <Route path="/mlagrievances/:constituencyData" element={<Mlagrievances/>} />
      <Route path="/cleargrievance/:id" element={<Clearinggrievance/>} />
      <Route path="/normaluser" element={<Normaluser/>} />
    </Routes>
    </BrowserRouter>
   </div>
  )
}

export default App