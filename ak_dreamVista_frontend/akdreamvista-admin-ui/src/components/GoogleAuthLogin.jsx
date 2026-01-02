import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function GoogleAuthLogin() {
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse) => {
    const decoded = jwt_decode(credentialResponse.credential);
    const fullName = decoded.name;
    const email = decoded.email;

    const res = await fetch("http://23.20.0.192:8080/api/auth/google-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, email }),
    });

    const data = await res.json();
    localStorage.setItem("token", data.token);
    localStorage.setItem("fullName", data.fullName);
    localStorage.setItem("role", data.role);

    navigate("/");
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div className="google-card">
        <h2>Login / Register</h2>
        <p>Continue with Gmail. No password required.</p>

        <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => alert("Login Failed")} />

        <p style={{ marginTop: "18px", color: "gray" }}>
          Only Google authentication is allowed.
        </p>
      </div>
    </GoogleOAuthProvider>
  );
}
