import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaLock, FaArrowLeft, FaShieldAlt, FaCheckCircle } from "react-icons/fa";
import "./ChangePassword.css"; 

export default function ChangePassword() {
  const [formData, setFormData] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsActive(true);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage("❌ New passwords do not match!");
      return;
    }

    setLoading(true);
    try {
     const token = localStorage.getItem("token");
axios.post("http://localhost:8080/api/auth/change-password",
  { currentPassword: formData.currentPassword, newPassword: formData.newPassword },
  { headers: { Authorization: `Bearer ${token}` } }
);

      
      setMessage("✅ Password updated! Redirecting...");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setMessage("❌ " + (err.response?.data || "Failed to change password"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ak-login-page">
      <div className={`ak-login-card ${isActive ? "active" : ""}`}>
        <button className="ak-back-link" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back
        </button>

        <div className="ak-login-header">
          <div className="ak-login-logo">
            <FaShieldAlt />
          </div>
          <h2>Security <span>Update</span></h2>
          <p>Change your password to keep your account secure</p>
        </div>

        {message && (
          <div className={`ak-msg-pop ${message.includes("✅") ? "msg-success" : "msg-error"}`}>
            {message}
          </div>
        )}

        <form className="ak-login-form" onSubmit={handleSubmit}>
          <div className="ak-input-group">
            <label><FaLock /> Current Password</label>
            <input 
              type="password" 
              name="currentPassword" 
              placeholder="Enter current password" 
              required 
              onChange={handleChange} 
            />
          </div>

          <div className="ak-input-group">
            <label><FaLock /> New Password</label>
            <input 
              type="password" 
              name="newPassword" 
              placeholder="Min. 6 characters" 
              required 
              onChange={handleChange} 
            />
          </div>

          <div className="ak-input-group">
            <label><FaLock /> Confirm New Password</label>
            <input 
              type="password" 
              name="confirmPassword" 
              placeholder="Repeat new password" 
              required 
              onChange={handleChange} 
            />
          </div>

          <button type="submit" className="ak-login-btn" disabled={loading}>
            {loading ? "Updating..." : "Update Password"} 
            {!loading && <FaCheckCircle className="btn-icon" />}
          </button>
        </form>
      </div>
    </div>
  );
}