import React, { useState } from "react";
import axios from "axios";
import "../page-styles/Contact.css";
import { useTheme } from "../context/ThemeContext";
import { BACKEND_URL } from "../config";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const { darkMode } = useTheme();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BACKEND_URL}/api/contact/send`, formData);
      setStatus("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("Something went wrong...");
    }
  };

  return (
    <section className="form-container">
      <form
        onSubmit={handleSubmit}
        className={`contact-form ${darkMode ? "dark-theme" : "light-theme"}`}
      >
        <h2>Contact Me</h2>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit">Send</button>
        {status && <p>{status}</p>}
      </form>
    </section>
  );
};

export default Contact;