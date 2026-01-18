import React, { useEffect, useState, useCallback } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { FaPhone, FaRegClock, FaFacebookF } from "react-icons/fa";
import "./Header.css";
import logo from "../assets/images/logo-ak-dreamvista.png";

const formatTime = (seconds) => {
  if (seconds <= 0) return "00:00:00";
  const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
};

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [timeLeft, setTimeLeft] = useState("");

  /* ================= HANDLERS ================= */
  const handleLogout = useCallback(() => {
    // Capture role BEFORE clearing storage
    const currentRole = localStorage.getItem("role") || role;
    
    localStorage.clear();
    setIsLoggedIn(false);
    setRole(null);
    setTimeLeft("");
    window.dispatchEvent(new Event("authChange"));

    // REDIRECT LOGIC
    if (currentRole === "ADMIN") {
      navigate("/admin-login");
    } else {
      navigate("/"); // Users always go Home
    }
  }, [navigate, role]);

  const handleBuyClick = () => {
    if (!isLoggedIn) navigate("/login");
    else navigate("/buy");
  };

  /* ================= SESSION TIMER LOGIC ================= */
  useEffect(() => {
    if (!isLoggedIn) {
      setTimeLeft("");
      return;
    }

    const interval = setInterval(() => {
      const expiresIn = localStorage.getItem("expiresIn");
      const loginTime = localStorage.getItem("loginTime");

      if (!expiresIn || !loginTime) {
        setTimeLeft("00:00:00");
        return;
      }

      const expiryTimestamp = Number(loginTime) + Number(expiresIn) * 1000;
      const diffInSeconds = Math.floor((expiryTimestamp - Date.now()) / 1000);

      if (diffInSeconds <= 0) {
        clearInterval(interval);
        setTimeLeft("EXPIRED");
        handleLogout(); // This triggers the redirect
      } else {
        setTimeLeft(formatTime(diffInSeconds));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isLoggedIn, handleLogout]);

  /* ================= AUTH SYNC ================= */
  useEffect(() => {
    const syncAuth = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
      setRole(localStorage.getItem("role"));
    };
    window.addEventListener("authChange", syncAuth);
    window.addEventListener("storage", syncAuth);
    return () => {
      window.removeEventListener("authChange", syncAuth);
      window.removeEventListener("storage", syncAuth);
    };
  }, []);

  return (
    <header className="header-container">
      <div className="top-black-bar">
       
      </div>

      <div className="nav-section">
        <div className="nav-container">
          <div className="nav-left">
<div className="logo-section" onClick={() => navigate("/")}>
            <img src={logo} alt="AK DreamVista" className="premium-logo" />
          </div>
            
              <ul className="nav-links admin-nav-links">
                <li><NavLink to="/admin-dashboard" end>Dashboard</NavLink></li>
                <li><NavLink to="/add-property">Add Property</NavLink></li>
                <li><NavLink to="/admin-dashboard" state={{ usersOnly: true }} className={({ isActive }) => (isActive && location.state?.usersOnly ? "active" : "")}>Customers</NavLink></li>
                <li><NavLink to="/admin-dashboard" state={{ openTable: "ALL_PROPERTIES" }} className={({ isActive }) => (isActive && location.state?.openTable === "ALL_PROPERTIES" ? "active" : "")}>Properties</NavLink></li>
                <li><NavLink to="/admin-dashboard" state={{ openTable: "INVOICES" }} className={({ isActive }) => (isActive && location.state?.openTable === "INVOICES" ? "active" : "")}>Invoices</NavLink></li>
              <li><NavLink to="/admin-messages">Messages</NavLink></li>
              </ul>
            
          </div>

          <div className="nav-right">
            
           {isLoggedIn && (
  <span className="logout-link premium-nav-btn" onClick={handleLogout}>
    LOGOUT
  </span>
)}
          </div>
        </div>
      </div>
    </header>
  );
}