import React, { useEffect, useState } from "react";
import axios from "axios";
import "../page-styles/Dashboard.css";
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

  const [projects, setProjects] = useState([]); // store fetched projects
  const { darkMode } = useTheme();

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${BACKEND_URL}/api/project/my-projects`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProjects(res.data); // save response to state
    } catch (err) {
      console.error("Error fetching projects: ", err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to add a project..!");
        return;
      }

      await axios.post(
        `${BACKEND_URL}/api/project/add`,
        {
          ...formData,
          techStack: formData.techStack.split(",")
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      alert("Project added!");
      setFormData({
        title: "",
        description: "",
        techStack: "",
        imageUrl: "",
        liveLink: ""
      });

      fetchProjects(); // refresh list after adding
    } catch (err) {
      alert("Error adding project");
    }
  };

  return (
    <main className="form-container">
      {/* Add project form */}
      <form
        onSubmit={handleAddProject}
        className={`dashboard-form ${darkMode ? "dark-theme" : "light-theme"}`}
      >
        <h2>Add New Project</h2>
        <input
          name="title"
          placeholder="Project Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          name="techStack"
          placeholder="Tech Stack (comma separated)"
          value={formData.techStack}
          onChange={handleChange}
          required
        />
        <input
          name="imageUrl"
          placeholder="Image URL"
          value={formData.imageUrl}
          onChange={handleChange}
        />
        <input
          name="liveLink"
          placeholder="Live Link"
          value={formData.liveLink}
          onChange={handleChange}
        />
        <button type="submit">Add Project</button>
      </form>

      {/* Display fetched projects */}
      <section className="projects-list">
        <h2>My Projects</h2>
        {projects.length === 0 ? (
          <p>No projects yet.</p>
        ) : (
          projects.map((project) => (
            <div key={project._id} className="project-card">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <p>
                <strong>Tech Stack:</strong> {project.techStack.join(", ")}
              </p>
              {project.imageUrl && <img src={project.imageUrl} alt={project.title} />}
              {project.liveLink && (
                <p>
                  <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                    Live Demo
                  </a>
                </p>
              )}
            </div>
          ))
        )}
      </section>
    </main>
  );
};

export default Dashboard;
