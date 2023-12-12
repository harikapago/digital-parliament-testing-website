import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const Mlagrievances = () => {
  const [grievances, setGrievances] = useState([]);
  const { constituencyData } = useParams();

  useEffect(() => {
    // Fetch grievances from the API for the specific constituency
    const fetchGrievances = async () => {
      try {
        const response = await fetch('https://nodebackend-for-dpapp.azurewebsites.net/get-grievances');
        if (response.ok) {
          const data = await response.json();
          // Filter grievances based on the constituency name
          const filteredGrievances = data.filter((grievance) => grievance.constituencyName === constituencyData);
          setGrievances(filteredGrievances);
          console.log(filteredGrievances);
        } else {
          console.error('Failed to fetch grievances');
        }
      } catch (error) {
        console.error('Error during grievance fetch:', error);
      }
    };

    fetchGrievances();
  }, [constituencyData]); // Re-run when the constituencyData changes

  return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h1>Grievances received in {constituencyData}</h1>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'center' }}>
        {grievances.map((grievance) => (
          <div key={grievance._id} className="grievance-item" style={{ width:"80%",border: '2px solid black', width: '100%', margin: '5px', padding: '10px' }}>
            <h3>{grievance.title}</h3>
            <p>{grievance.description}</p>
            <a href={grievance.imagePath} target="_blank">  <img src={grievance.imagePath} alt="Grievance"style={{height:"200px",width:"100%"}} />
           </a>
            <p>Constituency: {grievance.constituencyName}</p>
            <p>Status: {grievance.approvalStatus}</p>
            <p>Date: {new Date(grievance.dateOfPosting).toLocaleString()}</p>

            <Link to={`/cleargrievance/${grievance._id}`}>
              <button className='btn' style={{ backgroundColor: 'blue', color: 'white' }}>Clear Grievance</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mlagrievances;
