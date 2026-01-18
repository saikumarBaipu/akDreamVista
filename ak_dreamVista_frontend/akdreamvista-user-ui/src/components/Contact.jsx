import React, { useState, useEffect } from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaPaperPlane, FaClock } from "react-icons/fa";
import "./Contact.css";
import { useNavigate } from "react-router-dom";
export default function Contact() {
  const [isActive, setIsActive] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("");
const navigate = useNavigate();
  useEffect(() => {
    setIsActive(true);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
        const response = await fetch("http://localhost:8080/api/contact/send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            setStatus("success");
            setFormData({ name: "", email: "", subject: "", message: "" });
            setTimeout(() => {
          navigate("/");
        }, 2000);
        } else {
            setStatus("error");
        }
    } catch (error) {
        setStatus("error");
        console.error("Submission error:", error);
    }
};

  return (
    <div className="ak-contact-page">
      <div className={`ak-contact-container ${isActive ? "active" : ""}`}>
        
        {/* --- LEFT SIDE: INFO --- */}
        <div className="ak-contact-info">
          <div className="ak-info-header">
            <h2>Get in <span>Touch</span></h2>
            <p>Have questions about a property? Our team is here to help you find your dream home.</p>
          </div>

          <div className="ak-info-cards">
            <div className="ak-info-item">
              <div className="ak-info-icon"><FaPhoneAlt /></div>
              <div>
                <h4>Call Us</h4>
                <p>+91 98765 43210</p>
              </div>
            </div>

            <div className="ak-info-item">
              <div className="ak-info-icon"><FaEnvelope /></div>
              <div>
                <h4>Email Us</h4>
                <p>support@dreamvista.com</p>
              </div>
            </div>

            <div className="ak-info-item">
              <div className="ak-info-icon"><FaMapMarkerAlt /></div>
              <div>
                <h4>Visit Office</h4>
                <p>123 Real Estate Blvd, Tech Park, Hyderabad</p>
              </div>
            </div>

            <div className="ak-info-item">
              <div className="ak-info-icon"><FaClock /></div>
              <div>
                <h4>Working Hours</h4>
                <p>Mon - Sat: 9:00 AM - 7:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- RIGHT SIDE: FORM --- */}
        <div className="ak-contact-card">
          <form className="ak-contact-form" onSubmit={handleSubmit}>
            <div className="ak-input-group">
              <label>Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required />
            </div>

            <div className="ak-input-group">
              <label>Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" required />
            </div>

            <div className="ak-input-group">
              <label>Subject</label>
              <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Property Inquiry" required />
            </div>

            <div className="ak-input-group">
              <label>Message</label>
              <textarea name="message" value={formData.message} onChange={handleChange} rows="4" placeholder="How can we help you?" required></textarea>
            </div>

            <button type="submit" className="ak-login-btn" disabled={status === "sending"}>
              {status === "sending" ? "Sending..." : "Send Message"} 
              <FaPaperPlane className="btn-icon" />
            </button>

            {status === "success" && (
              <div className="ak-msg-pop msg-success">✅ Message sent successfully!</div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}