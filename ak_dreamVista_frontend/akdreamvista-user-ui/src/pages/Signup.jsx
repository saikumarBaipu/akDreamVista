import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState("");
  const [isActive, setIsActive] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsActive(true);
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!email.includes("@")) return setMsg("⚠ Enter a valid Email address");
    if (password.length < 3) return setMsg("⚠ Password must be at least 3 characters");

    try {
      const res = await fetch("http://23.20.0.192:8080/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role: "USER" }),
      });

      if (res.status === 409) return setMsg("❌ Email already registered.");
      if (!res.ok) return setMsg("❌ Signup failed");

      setMsg("✅ Account created! Redirecting to Login...");
      setTimeout(() => navigate("/"), 1500);

    } catch (err) {
      setMsg("❌ Server error. Please try again later.");
    }
  };

  return (
    <div className="ak-signup-page">
      <div className={`ak-signup-card ${isActive ? "active" : ""}`}>
        <div className="ak-signup-header">
          <div className="ak-signup-logo">
            <i className="fa-solid fa-user-plus"></i>
          </div>
          <h2>Join <span>DreamVista</span></h2>
          <p>Start your direct property journey today</p>
        </div>

        {msg && (
          <div className={`ak-msg-pop ${msg.includes("✅") ? "msg-success" : "msg-error"}`}>
            {msg}
          </div>
        )}

        <form className="ak-signup-form" onSubmit={handleSignup}>
          <div className="ak-input-group">
            <label><i className="fa-solid fa-envelope"></i> Email Address</label>
            <input
              type="email"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="ak-input-group">
            <label><i className="fa-solid fa-lock"></i> Create Password</label>
            <div className="ak-password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Min. 3 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="ak-eye-toggle" onClick={() => setShowPassword(!showPassword)}>
                <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
              </span>
            </div>
          </div>

          <button type="submit" className="ak-signup-btn">
            Create Account <i className="fa-solid fa-arrow-right"></i>
          </button>
        </form>

        <div className="ak-auth-footer">
          <p>Already have an account? <Link to="/login">Login Here</Link></p>
        </div>
      </div>
    </div>
  );
}