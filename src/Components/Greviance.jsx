import React, { useState } from "react";
import axios from "axios";

const GrievanceForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("description", formData.description);
      form.append("location", formData.location);
      form.append("image", formData.image);

      const response = await axios.post("https://nodebackend-for-dpapp.azurewebsites.net/post-grievance", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201) {
        alert("Grievance posted successfully");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };




  
  return (
    <div className="container" style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
      <h2>Post a Grievance</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            required
            value={formData.description}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Image:</label>
          <input
            type="file"
            name="image"
            required
            accept="image/*"
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default GrievanceForm;


