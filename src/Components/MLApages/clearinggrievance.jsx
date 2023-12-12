import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Clearinggrievance = () => {
  const [grievance, setGrievance] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    // Fetch all grievances
    const fetchGrievances = async () => {
      try {
        const response = await fetch('https://nodebackend-for-dpapp.azurewebsites.net/get-grievances');
        if (response.ok) {
          const data = await response.json();
          // Find the grievance with the matching ID
          const selectedGrievance = data.find((item) => item._id === id);
          setGrievance(selectedGrievance);
        } else {
          console.error('Failed to fetch grievances');
        }
      } catch (error) {
        console.error('Error during grievance fetch:', error);
      }
    };

    fetchGrievances();
  }, [id]); // Fetch details whenever the ID changes


// -------------------form-----------

const [formData, setFormData] = useState({
  createdBy: '',
  description: '',
  grievanceId:id,
  supportingPhotos: [],
});

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};

const handlePhotoChange = (e) => {
  const files = e.target.files;
  setFormData((prevData) => ({
    ...prevData,
    supportingPhotos: [...prevData.supportingPhotos, ...files],
  }));
};


const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // Grievance Clearance data
    const formDataToSend = new FormData();
    formDataToSend.append('clearedBy', formData.createdBy);
    formDataToSend.append('grievance_id', formData.grievanceId);
    formDataToSend.append('description', formData.description);

    formData.supportingPhotos.forEach((photo, index) => {
      formDataToSend.append(`photos`, photo);
    });

    // Post Grievance Clearance
    const responseClearance = await fetch('https://nodebackend-for-dpapp.azurewebsites.net/post-grievance-clearance', {
      method: 'POST',
      body: formDataToSend,
    });

    if (responseClearance.ok) {
      const responseData = await responseClearance.json();
      console.log('Grievance Clearance posted successfully:', responseData);

      // If Grievance Clearance is successful, update the original Grievance
      const responseUpdateGrievance = await fetch(`https://nodebackend-for-dpapp.azurewebsites.net/update-grievance/${formData.grievanceId}`, {
        method: 'PUT', // Assuming you are using a PUT request for updating
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Update Grievance status or any other fields as needed
          approvalStatus: 'cleared', // Example: Change the status to 'cleared'
        }),
      });

      if (responseUpdateGrievance.ok) {
        console.log('Grievance updated successfully');
        // You may want to redirect to another page or handle success as needed
      } else {
        console.error('Failed to update Grievance');
      }
    } else {
      console.error('Failed to post Grievance Clearance');
    }
  } catch (error) {
    console.error('Error during Grievance Clearance post:', error);
  }

  // Reset the form after submission
  setFormData({
    createdBy: '',
    description: '',
    grievanceId: '',
    supportingPhotos: [],
  });
};

  

  return (
    <div className='container' style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
      {grievance ? (
        <div>
          <h1>Grievance Details</h1>
          <h3>{grievance.title}</h3>
          <p>{grievance.description}</p>
         <a href={grievance.imagePath} target="_blank"> <img src={grievance.imagePath} alt="Grievance" style={{height:"200px"}} />
         </a>
          <p>Constituency: {grievance.constituencyName}</p>
          <p>Status: {grievance.approvalStatus}</p>
          <p>Date: {new Date(grievance.dateOfPosting).toLocaleString()}</p>

          {grievance.approvalStatus !== 'grievance cleared' && (
          <form onSubmit={handleSubmit}>
        <label>
          Created By:
          <input
            type="text"
            name="createdBy"
            value={formData.createdBy}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          ></textarea>
        </label>
        <br />
        <label>
          Supporting Photos:
          <input type="file" multiple onChange={handlePhotoChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      )}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Clearinggrievance;
