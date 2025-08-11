import React, { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css"
import "../components-styling/Projects.css"
import { BACKEND_URL } from "../config";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/project/my-projects`,{
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
    .then(res => setProjects(res.data || []))
    .catch(err => console.error(err));
    setProjects([]);
  },[]);
  

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/project/all`)
      .then(res => setProjects(res.data || []))
      .catch(err => console.error(err));
      setProjects([]);
  }, []);

  useEffect(()=>
    {
        AOS.init({duration:1000})
    },[]);

  return (
      <div className="project-list" data-aos="fade-up">
        {projects.map(project => (
          <div key={project._id} className="project-card">
            <img src={project.imageUrl} alt={project.title} />
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p><strong>Tech:</strong> {project.techStack.join(", ")}</p>
            <a href={project.liveLink} target="_blank" rel="noreferrer">View Live</a>
          </div>
        ))}
      </div>
  );
};

export default Projects;