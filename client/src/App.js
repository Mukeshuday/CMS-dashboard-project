import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useTheme } from "./context/ThemeContext";

// Components
import ProjectHeader from "./components/ProjectHeader";
import Projects from "./components/Projects";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Blog from "./pages/Blog";

import "./App.css";

function App() {
  const { darkMode } = useTheme();

  // Layout for Home Page after login
  const HomeLayout = () => (
    <>
      <ProjectHeader />
      <Projects />
    </>
  );

  return (
    <div className={`App ${darkMode ? "dark-theme" : "light-theme"}`}>
      <Router>
        <Routes>
          {/* Landing / Blog Page */}
          <Route path="/" element={<Blog />} />

          {/* Auth Pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Home Page (Projects + Header) */}
          <Route path="/home" element={<HomeLayout />} />

          {/* Contact Page */}
          <Route
            path="/contact"
            element={
              <>
                <ProjectHeader />
                <Contact />
              </>
            }
          />

          {/* Protected Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <>
                  <ProjectHeader />
                  <Dashboard />
                </>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;