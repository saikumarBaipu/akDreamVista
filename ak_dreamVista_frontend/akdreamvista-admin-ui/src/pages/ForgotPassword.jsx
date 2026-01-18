import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./ForgotPassword.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPass, setNewPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const resetPassword = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!email.includes("@")) return setMsg("⚠ Enter a valid email");
    if (newPass.length < 4) return setMsg("⚠ Password must be at least 4 characters");

    try {
      const res = await fetch("http://localhost:8080/api/admin/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: newPass }),
      });

      const text = await res.text();
      if (!res.ok) throw new Error(text);

      setMsg("✅ Password updated successfully. Redirecting...");
      setTimeout(() => navigate("/admin-login"), 2000);
    } catch (err) {
      setMsg("❌ Failed to reset password");
    }
  };

  return (
    <div className="premium-wrapper">
      <div className="premium-container">
        <div className="auth-glass-card">
          
          <div className="auth-header">
            <div className="auth-icon-circle admin-theme">
              <i className="fa-solid fa-key"></i>
            </div>
            <h2>Reset <span>Password</span></h2>
            <p>Update your administrator credentials</p>
          </div>

          {msg && (
            <div className={`auth-msg-box ${msg.includes("⚠") || msg.includes("❌") ? "error" : "success"}`}>
              {msg}
            </div>
          )}

          <form className="auth-form-body" onSubmit={resetPassword}>
            <div className="auth-input-group">
              <label>Admin Email</label>
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
              <label>New Master Password</label>
              <div className="input-with-icon">
                <i className="fa-solid fa-lock"></i>
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Enter new password"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  required
                />
                <button 
                  type="button" 
                  className="eye-toggle"
                  onClick={() => setShowPass(!showPass)}
                >
                  <i className={`fa-solid ${showPass ? "fa-eye-slash" : "fa-eye"}`}></i>
                </button>
              </div>
            </div>

            <button type="submit" className="auth-submit-btn">
              Update Password
            </button>
          </form>

          <div className="auth-footer-note">
            <p>Remembered your password? <Link to="/admin-login">Go Back</Link></p>
          </div>

        </div>
      </div>
    </div>
  );
}