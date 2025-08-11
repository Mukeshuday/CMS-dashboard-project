import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../page-styles/Blog.css";

const Blog = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="blog-container">
      <div className="blog-overlay"></div>

      <div className="blog-content" data-aos="fade-up">
        <h1 className="blog-title">
          <span className="highlight">Build</span> Your Dreams.
        </h1>
        <p className="blog-subtitle" data-aos="fade-up" data-aos-delay="200">
          Showcase, manage, and share your projects like never before.  
          A creative platform to inspire and connect.
        </p>
        <div className="blog-buttons" data-aos="fade-up" data-aos-delay="400">
          <a href="/login" className="btn-primary">Get Started</a>
          <a href="/register" className="btn-secondary">Join Now</a>
        </div>
      </div>

      <div className="scroll-indicator" data-aos="fade-up" data-aos-delay="600">
        <span>↓ Scroll to explore</span>
      </div>
    </section>
  );
};

export default Blog;