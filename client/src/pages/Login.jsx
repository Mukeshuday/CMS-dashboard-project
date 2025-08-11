import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../page-styles/Login.css";
import { BACKEND_URL } from "../config";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BACKEND_URL}/api/auth/login`, formData);
      localStorage.setItem("token", res.data.token);
      if(res.data.username){
        localStorage.setItem("username",res.data.username);
      }
      setStatus("Login Successful! Redirecting...");
      setTimeout(() => navigate("/home"), 1000);
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <section className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Welcome Back</h2>
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
        <button type="submit">Login</button>
        {error && <p className="error-text">{error}</p>}
        {status && <p className="success-text">{status}</p>}
        <p>Don’t have an account? <a href="/register">Sign Up</a></p>
      </form>
    </section>
  );
};

export default Login;