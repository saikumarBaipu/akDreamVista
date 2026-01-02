import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";

export default function UserForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPass, setNewPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const resetPassword = async () => {
    setMsg("");

    if (!email.includes("@")) {
      return setMsg("⚠ Enter a valid email");
    }

    if (newPass.length < 3) {
      return setMsg("⚠ Password must be at least 3 characters");
    }

    try {
      const res = await fetch(
        "http://23.20.0.192:8080/api/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
  email,
  password: newPass,   // 🔥 must be "password"
})

        }
      );

      const text = await res.text();

      if (!res.ok) throw new Error(text);

      setMsg("✅ Password updated successfully. Redirecting...");

      setTimeout(() => {
        navigate("/buy");
      }, 2000);

    } catch (err) {
      setMsg("❌ Failed to reset password");
    }
  };

  return (
    <div className="forgot-container">
      <h3>User Reset Password</h3>

      {msg && (
        <p
          className={`message ${
            msg.includes("⚠") || msg.includes("❌")
              ? "error"
              : "success"
          }`}
        >
          {msg}
        </p>
      )}

      <form
        className="forgot-form"
        onSubmit={(e) => e.preventDefault()}
      >
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter admin email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>New Password</label>
        <div className="password-wrapper">
          <input
            type={showPass ? "text" : "password"}
            placeholder="Enter new password"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
          />
          <span
            className="eye-icon"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? "👁️" : "👁️‍🗨️"}
          </span>
        </div>

        <button type="button" onClick={resetPassword}>
          Update Password
        </button>
      </form>
    </div>
  );
}
