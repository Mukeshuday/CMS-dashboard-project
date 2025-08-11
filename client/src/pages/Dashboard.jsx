import React, { useEffect, useState } from "react";
import axios from "axios";
import "../page-styles/Dashboard.css"
import { useTheme } from "../context/ThemeContext";
import { BACKEND_URL } from "../config";

const Dashboard = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    techStack: "",
    imageUrl: "",
    liveLink: ""
  });

  const { darkMode } = useTheme();

  const fetchProjects = async () =>{
    try{
      await axios.get(`${BACKEND_URL}/api/project/my-projects`,
      {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      });
    }catch (err){
      console.error("Error fetching projects: ",err)
    }
  }; 

  useEffect(()=> {
    fetchProjects();
  },[]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    try {

      const token = localStorage.getItem("token");
      if(!token){
        alert("You must be logged in to add a project..!");
        return;
      }

      await axios.post(`${BACKEND_URL}/api/project/add`, {
        ...formData,
        techStack: formData.techStack.split(",")
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert("Project added!");
      setFormData({ title: "", description: "", techStack: "", imageUrl: "", liveLink: "" });

      fetchProjects();
    } catch (err) {
      alert("Error adding project");
    }
  };

  return (
    <main className="form-container">
      <form onSubmit={handleAddProject}  className={`dashboard-form ${darkMode ? "dark-theme" : "light-theme"}`}
>
        <h2>Add New Project</h2>
        <input name="title" placeholder="Project Title" value={formData.title} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
        <input name="techStack" placeholder="Tech Stack (comma separated)" value={formData.techStack} onChange={handleChange} required />
        <input name="imageUrl" placeholder="Image URL" value={formData.imageUrl} onChange={handleChange} />
        <input name="liveLink" placeholder="Live Link" value={formData.liveLink} onChange={handleChange} />
        <button type="submit">Add Project</button>
      </form>
    </main>
  );
};

export default Dashboard;