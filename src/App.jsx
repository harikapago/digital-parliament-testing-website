import React from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import GrievanceForm from './Components/Greviance';


const App = () => {
  return (
   <div>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<GrievanceForm/>}>

      </Route>
    </Routes>
    </BrowserRouter>
   </div>
  )
}

export default App