import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./AdminLogin.css";

export default function AdminSignin() {
  const navigate = useNavigate();

  const MASTER_PASSWORD = "AKDV@2025"; // 🔐 master admin password

  const [email, setEmail] = useState("");
  const [adminKey, setAdminKey] = useState("");
  const [message, setMessage] = useState("");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(true);
    localStorage.clear();
  }, []);

  /* ================= ADMIN LOGIN (MASTER PASSWORD) ================= */
  const handleAdminLogin = (e) => {
    e.preventDefault();
    setMessage("");

    if (!email.trim()) {
      setMessage("❌ Email is required");
      return;
    }

    if (!adminKey.trim()) {
      setMessage("❌ Admin access key is required");
      return;
    }

    if (adminKey !== MASTER_PASSWORD) {
      setMessage("❌ Invalid admin access key");
      return;
    }
    
localStorage.setItem("role", "ADMIN");
localStorage.setItem("token", "ADMIN_MASTER_TOKEN");
localStorage.setItem("adminEmail", email);
localStorage.setItem("loginTime", Date.now().toString());
localStorage.setItem("expiresIn", "7200");

navigate("/admin-dashboard");



    window.dispatchEvent(new Event("authChange"));

    setMessage("✅ Admin login successful! Redirecting...");
    setTimeout(() => navigate("/admin-dashboard"), 1000);
  };

  return (
    <div className="ak-login-page">
      <div className={`ak-login-card ${isActive ? "active" : ""}`}>

        {/* HEADER */}
        <div className="ak-login-header">
          <div className="ak-login-logo">
            <i className="fa-solid fa-user-shield"></i>
          </div>
          <h2>Admin <span>Login</span></h2>
          <p>Enter admin credentials to continue</p>
        </div>

        {/* MESSAGE */}
        {message && (
          <div
            className={`ak-msg-pop ${
              message.includes("✅") ? "msg-success" : "msg-error"
            }`}
          >
            {message}
          </div>
        )}

        {/* LOGIN FORM */}
        <form className="ak-login-form" onSubmit={handleAdminLogin}>

          <div className="ak-input-group">
            <label>
              <i className="fa-solid fa-envelope"></i> Admin Email
            </label>
            <input
              type="email"
              placeholder="admin@dreamvista.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="ak-input-group">
            <label>
              <i className="fa-solid fa-key"></i> Admin Access Key
            </label>
            <input
              type="password"
              placeholder="Enter admin key"
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="ak-login-btn">
            Login <i className="fa-solid fa-arrow-right-to-bracket"></i>
          </button>
        </form>

        <div className="ak-auth-footer">
          <p>
            Not an admin? <Link to="/login">User Login</Link>
          </p>
        </div>

      </div>
    </div>
  );
}
