import React, { useState } from "react";
import axios from "axios";
import "../page-styles/Register.css";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

const Register = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setStatus("");

    try {
      const res = await axios.post(`${BACKEND_URL}/api/auth/register`, formData);
      localStorage.setItem("token", res.data.token);
      if (res.data.username) {
        localStorage.setItem("username", res.data.username);
      }
      setStatus("Registration Successful! Redirecting...");
      setTimeout(() => navigate("/home"), 1500);
    } catch (err) {
      if (err.response && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
    console.log("Register Data:", formData);
  };

  return (
    <section className="register-page">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Create Your Account</h2>

        {/* Show success or error messages */}
        {status && <p className="success-message">{status}</p>}
        {error && <p className="error-message">{error}</p>}

        <input
          type="text"
          name="username"
          placeholder="Full Name"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </section>
  );
};

export default Register;
