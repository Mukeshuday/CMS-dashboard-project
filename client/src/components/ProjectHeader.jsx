import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import "../components-styling/ProjectsHeader.css";

const ProjectHeader = () => {
  const { toggleTheme, darkMode } = useTheme();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("username"); // stored during login/register
    if (storedUser) {
      setUsername(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <div className="project-header">
      <h1>Welcome back, {username || "Guest"}</h1>

      <div className="nav-links">
        <Link to="/home">Home</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/dashboard">Dashboard</Link>
        <button onClick={toggleTheme} className="theme-toggle">
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>

        {/* User Avatar */}
        <div className="user-menu">
          <div 
            className="user-avatar" 
            onClick={() => setMenuOpen(!menuOpen)}
            title="User Menu"
          >
            {username ? username.charAt(0).toUpperCase() : "U"}
          </div>
          {menuOpen && (
            <div className="dropdown-menu">
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;