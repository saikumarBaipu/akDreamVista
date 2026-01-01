import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminSignup.css";

export default function AdminSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!email.includes("@")) return setMsg("⚠ Enter a valid Email");
    if (password.length < 3) return setMsg("⚠ Password must be 6+ characters");

    try {
      const res = await fetch("http://3.237.234.18:8080/api/admin/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const text = await res.text();
        return setMsg(text);
      }

      const data = await res.json();

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", "ADMIN");
      localStorage.setItem("expiresIn", data.expiresIn);

      navigate("/addProperty");

    } catch {
      setMsg("❌ Server error");
    }
  };

  return (
    <div className="signup-container">
      <h2>Create Admin Account</h2>

      {msg && <p className={msg.includes("⚠") || msg.includes("❌") ? "error" : "success"}>{msg}</p>}

      <form onSubmit={handleSubmit} className="signup-form">
        
        <label>Email</label>
        <input
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "👁️" : "👁️‍🗨️"}
          </span>
        </div>

        <button type="submit">Create Admin Account</button>
      </form>
    </div>
  );
}
