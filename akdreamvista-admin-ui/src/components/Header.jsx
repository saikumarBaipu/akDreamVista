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
        <div className="top-black-inner">
          <div className="top-left">AK DreamVista</div>

          {isLoggedIn && (
            <div className="top-center">
              <div className="ak-session-badge">
                <FaRegClock />
                <span>Expires in: </span>
                <span className="timer-countdown">{timeLeft || "Calculating..."}</span>
              </div>
            </div>
          )}

          {/* <div className="top-right">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF />
            </a>
          </div> */}
        </div>
      </div>

      <div className="nav-section">
        <div className="nav-container">
          <div className="nav-left">
            <img src={logo} alt="logo" className="nav-logo" onClick={() => navigate("/")} style={{ cursor: "pointer" }} />

            {role !== "ADMIN" ? (
              <ul className="nav-links">
                <li><NavLink to="/" end>HOME</NavLink></li>
                <li><span className="nav-link-btn" onClick={handleBuyClick}>BUY A PROPERTY</span></li>
                <li><NavLink to="/sell">SELL A PROPERTY</NavLink></li>
                <li><NavLink to="/construct">CONSTRUCT</NavLink></li>
                <li><NavLink to="/elevators">ELEVATORS</NavLink></li>
                <li><NavLink to="/about">ABOUT US</NavLink></li>
                <li><NavLink to="/help">HELP</NavLink></li>
                {!isLoggedIn && <li><NavLink to="/login" className="login-link">USER LOGIN</NavLink></li>}
              </ul>
            ) : (
              <ul className="nav-links admin-nav-links">
                <li><NavLink to="/admin-dashboard" end>Dashboard</NavLink></li>
                <li><NavLink to="/add-property">Add Property</NavLink></li>
                <li><NavLink to="/admin-dashboard" state={{ usersOnly: true }} className={({ isActive }) => (isActive && location.state?.usersOnly ? "active" : "")}>Customers</NavLink></li>
                <li><NavLink to="/admin-dashboard" state={{ openTable: "ALL_PROPERTIES" }} className={({ isActive }) => (isActive && location.state?.openTable === "ALL_PROPERTIES" ? "active" : "")}>Properties</NavLink></li>
                <li><NavLink to="/admin-dashboard" state={{ openTable: "INVOICES" }} className={({ isActive }) => (isActive && location.state?.openTable === "INVOICES" ? "active" : "")}>Invoices</NavLink></li>
              </ul>
            )}
          </div>

          <div className="nav-right">
            {role !== "ADMIN" && (
              <div className="phone-inline">
                <FaPhone /> +91 83280 41624
              </div>
            )}
            {isLoggedIn && (
              <span className="logout-link" onClick={handleLogout} style={{ cursor: "pointer" }}>
                LOGOUT
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}