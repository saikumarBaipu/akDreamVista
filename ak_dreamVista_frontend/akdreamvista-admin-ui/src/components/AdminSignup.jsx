import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./AdminSignup.css";

export default function AdminSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
 const allowedDomains = [
    "@gmail.com",
    "@yahoo.com"
    // "@outlook.com",
    // "@hotmail.com",
    // "@icloud.com",
    // "@live.com",
    // "@protonmail.com",
    // "@rediffmail.com",
    // "@zoho.com"
  ];
   const isAllowed = allowedDomains.some(domain =>
    email.toLowerCase().endsWith(domain)
  );

  if (!isAllowed) {
    return setMsg(
      "⚠ Only Gmail, Yahoo, Outlook, Hotmail, iCloud, Live, ProtonMail, RediffMail, and Zoho emails are permitted."
    );
  }
    if (!email.includes("@")) return setMsg("⚠ Enter a valid Email");
    if (password.length < 6) return setMsg("⚠ Password must be 6+ characters");

    try {
      const res = await fetch("http://localhost:8080/api/admin/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const text = await res.text();
        return setMsg(`⚠ ${text}`);
      }

      const data = await res.json();
      
      // FUNCTIONALITY PRESERVED + SESSION LOGIC
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", "ADMIN");
      localStorage.setItem("expiresIn", data.expiresIn || "10800"); 
      localStorage.setItem("loginTime", Date.now().toString()); 

      window.dispatchEvent(new Event("authChange"));
      navigate("/add-property");
    } catch (err) {
      setMsg("⚠️ We’re having trouble connecting right now. Please try again in a moment.");

      //setMsg("❌ Server connection error.");
    }
  };

  return (
    <div className="premium-wrapper">
      <div className="premium-container">
        <div className="auth-glass-card">
          
          <div className="auth-header">
            <div className="auth-icon-circle">
              <i className="fa-solid fa-user-plus"></i>
            </div>
            <h2>Admin <span>Registration</span></h2>
            <p>Enter credentials to initialize your account</p>
          </div>

          {msg && (
            <div className={`auth-msg-box ${msg.includes("⚠") || msg.includes("❌") ? "error" : "success"}`}>
              {msg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form-body">
            <div className="auth-input-group">
              <label>Work Email</label>
              <div className="input-with-icon">
                <i className="fa-solid fa-envelope"></i>
                <input
                  type="email"
                  placeholder="admin@dreamvista.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

           <div className="auth-input-group">
  <label>Secure Password</label>
  <div className="input-with-icon">
    {/* Left Icon */}
    <i className="fa-solid fa-lock"></i>
    
    <input
      type={showPassword ? "text" : "password"}
      placeholder="Min. 6 characters"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />

    
    <button 
      type="button" 
      className="eye-toggle"
      onClick={() => setShowPassword(!showPassword)}
    >
      <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
    </button>
  </div>
</div>

            <button type="submit" className="auth-submit-btn">
              Create Admin Account
            </button>
          </form>

          <div className="auth-footer-note">
            <p>Already have an account? <Link to="/admin-login">Log In</Link></p>
          </div>

        </div>
      </div>
    </div>
  );
}