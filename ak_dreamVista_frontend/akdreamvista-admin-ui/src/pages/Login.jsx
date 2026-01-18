import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [isActive, setIsActive] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsActive(true);
    const token = localStorage.getItem("token");
    if (token === "undefined" || token === "null") {
        localStorage.clear();
    }
  }, []);

 const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
        const response = await fetch("http://localhost:8080/api/auth/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const responseText = await response.text();
        let data;

        try {
            data = JSON.parse(responseText);
        } catch (err) {
            data = { message: responseText };
        }

        if (!response.ok) {
            return setMessage(data.message || "❌ Invalid credentials");
        }

        console.log("Login Response Data:", data);

        const token = data.token || data.accessToken;
        if (token) {
            localStorage.setItem("token", token);
            localStorage.setItem("role", data.role || "USER");
const expiresIn = data.expiresIn || 7200; 
    localStorage.setItem("expiresIn", expiresIn);
    localStorage.setItem("loginTime", Date.now().toString());
            const userObj = {
                id: data.id,      
                email: data.email,
                name: data.name || "User",
                role: data.role
            };

            localStorage.setItem("USER", JSON.stringify(userObj));
            window.dispatchEvent(new Event("authChange"));

            setMessage("✅ Welcome back! Redirecting...");
            setTimeout(() => {
                navigate("/");
            }, 1000);
        } else {
            console.error("Token not found in response!");
            setMessage("❌ Error: Token not received from server");
        }

    } catch (error) {
        console.error("Login Error:", error);
        setMessage("❌ Connection error. Try again.");
    }
};

  return (
    <div className="ak-login-page">
      <div className={`ak-login-card ${isActive ? "active" : ""}`}>
        <div className="ak-login-header">
          <div className="ak-login-logo">
             <i className="fa-solid fa-house-chimney-window"></i>
          </div>
          <h2>Welcome <span>Back</span></h2>
          <p>Login to manage your DreamVista properties</p>
        </div>

        {message && (
          <div className={`ak-msg-pop ${message.includes("✅") ? "msg-success" : "msg-error"}`}>
            {message}
          </div>
        )}

        <form className="ak-login-form" onSubmit={handleLogin}>
          <div className="ak-input-group">
            <label><i className="fa-solid fa-envelope"></i> Email Address</label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="ak-input-group">
            <label><i className="fa-solid fa-lock"></i> Password</label>
            <div className="ak-password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="ak-eye-toggle" onClick={() => setShowPassword(!showPassword)}>
                <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
              </span>
            </div>
          </div>

          <button type="submit" className="ak-login-btn">
            Sign In <i className="fa-solid fa-arrow-right-to-bracket"></i>
          </button>
        </form>

        <div className="ak-auth-footer">
          <p>Don't have an account? <Link to="/signup">Create One</Link></p>
          <Link to="/user-forgot-password">Forgot Password?</Link>
        </div>
      </div>
    </div>
  );
}