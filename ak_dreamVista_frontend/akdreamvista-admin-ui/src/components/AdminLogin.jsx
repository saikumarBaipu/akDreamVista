import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./AdminLogin.css";

export default function AdminSignin() {
  const navigate = useNavigate();

  const [step, setStep] = useState("LOGIN"); // LOGIN | OTP
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [isActive, setIsActive] = useState(false);
const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setIsActive(true);
    localStorage.clear();
  }, []);

  /* ================= STEP 1: EMAIL + PASSWORD ================= */
  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:8080/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "❌ Invalid credentials");
        return;
      }

      // ✅ OTP SENT
      localStorage.setItem("adminEmail", email);
      setMessage("✅ OTP sent to your email");
      setStep("OTP");

    } catch (err) {
      console.error(err);
      setMessage("⚠️ Service is temporarily unavailable. Please try again later.");
    }
  };

  /* ================= STEP 2: OTP VERIFY ================= */
  const handleOtpVerify = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch(
        "http://localhost:8080/api/admin/verify-login-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: localStorage.getItem("adminEmail"),
            otp
          })
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "❌ Invalid OTP");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("expiresIn", data.expiresIn);
localStorage.setItem("loginTime", Date.now().toString()); 
      setMessage("✅ Login successful!");
     //  localStorage.setItem("adminEmail", email);
    setMessage("✅ OTP sent to your email");
   // setStep("OTP");
      navigate("/add-property");

    } catch (err) {
      console.error(err);
      setMessage("⚠️ Service is temporarily unavailable. Please try again later.");
    }
  };

  return (
    <div className="ak-login-page">
      <div className={`ak-login-card ${isActive ? "active" : ""}`}>

        {/* HEADER */}
        <div className="ak-login-header">
          <div className="ak-login-logo admin-logo">
            <i className="fa-solid fa-user-shield"></i>
          </div>
          <h2>Admin <span>Login</span></h2>
          <p>
            {step === "LOGIN"
              ? "Enter credentials to receive OTP"
              : "Enter OTP sent to your email"}
          </p>
        </div>

        {/* MESSAGE */}
        {message && (
          <div className={`ak-msg-pop ${
            message.includes("✅") ? "msg-success" : "msg-error"
          }`}>
            {message}
          </div>
        )}

        {/* ================= STEP 1 FORM ================= */}
        {/* ================= STEP 1 FORM ================= */}
{step === "LOGIN" && (
  <form className="ak-login-form" onSubmit={handleLogin}>
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

    <button type="submit" className="ak-login-btn">
      Send OTP <i className="fa-solid fa-paper-plane"></i>
    </button>
  </form>
)}


        {/* ================= STEP 2 FORM ================= */}
        {step === "OTP" && (
          <form className="ak-login-form" onSubmit={handleOtpVerify}>

            <div className="ak-input-group">
              <label>
                <i className="fa-solid fa-shield-halved"></i> Email OTP
              </label>
              <input
                type="text" 
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                required
              />
            </div>

            <button type="submit" className="ak-login-btn">
              Verify OTP <i className="fa-solid fa-lock-open"></i>
            </button>
          </form>
        )}

        <div className="ak-auth-footer">
          <p>
            Don't have an account? <Link to="/admin-signup">Create One</Link>
          </p>
          
        </div>

      </div>
    </div>
  );
}
