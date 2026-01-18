import React, { useEffect, useState, useCallback, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaPhone, FaRegClock, FaUserCircle, FaChevronDown, FaFileInvoice, FaKey, FaSignOutAlt } from "react-icons/fa";
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
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [timeLeft, setTimeLeft] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Existing Logout Logic
  const handleLogout = useCallback(() => {
    localStorage.clear();
    setIsLoggedIn(false);
    setTimeLeft("");
    setShowDropdown(false);
    window.dispatchEvent(new Event("authChange"));
    navigate("/");
  }, [navigate]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Existing Session Timer Logic
  useEffect(() => {
    if (!isLoggedIn) {
      setTimeLeft("");
      return;
    }

    const interval = setInterval(() => {
      const expiresIn = localStorage.getItem("expiresIn");
      const loginTime = localStorage.getItem("loginTime");

      if (!expiresIn || !loginTime) {
        handleLogout();
        return;
      }

      const expiryTimestamp = Number(loginTime) + Number(expiresIn);
      const diffInSeconds = Math.floor((expiryTimestamp - Date.now()) / 1000);

      if (diffInSeconds <= 0) {
        clearInterval(interval);
        handleLogout();
      } else {
        setTimeLeft(formatTime(diffInSeconds));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isLoggedIn, handleLogout]);

  return (
    <header className="header-container">
      {/* Top Black Bar */}
      <div className="top-black-bar">
        <div className="top-black-inner">
          <div className="top-left-text">AK DreamVista</div>
          {isLoggedIn && (
            <div className="ak-session-badge">
              <FaRegClock />
              <span>Expires in: </span>
              <span className="timer-countdown">{timeLeft || "Calculating..."}</span>
            </div>
          )}
        </div>
      </div>

      <div className="nav-section">
        <div className="nav-container">
          
          {/* 1. Logo Section */}
          <div className="logo-box" onClick={() => navigate("/")} style={{ cursor: 'pointer' }}>
            <img src={logo} alt="AK DreamVista Logo" className="premium-logo" />
          </div>

          {/* 2. Menu Links */}
          <ul className="nav-links">
            <li><NavLink to="/" end>HOME</NavLink></li>
            <li><NavLink to="/buy">BUY A PROPERTY</NavLink></li>
            <li><NavLink to="/sell">SELL A PROPERTY</NavLink></li>
            <li><NavLink to="/construct">CONSTRUCT</NavLink></li>
            <li><NavLink to="/elevators">ELEVATORS</NavLink></li>
            <li><NavLink to="/about">ABOUT US</NavLink></li>
          </ul>

          {/* 3. Right Side - Contact & User Profile */}
          <div className="nav-right-actions">
            <div className="phone-badge">
              <FaPhone /> <span>+91 83280 41624</span>
            </div>
            
            <div className="auth-box" ref={dropdownRef}>
              {!isLoggedIn ? (
                <NavLink to="/login" className="login-link">
  USER LOGIN
</NavLink>

              ) : (
                <div className="profile-dropdown-container">
                  <div 
                    className="profile-trigger" 
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    <FaUserCircle className="user-icon" />
                    <span className="user-name">PROFILE</span>
                    <FaChevronDown className={`arrow-icon ${showDropdown ? 'open' : ''}`} />
                  </div>

                  {showDropdown && (
                    <div className="profile-dropdown-menu">
                      <div className="dropdown-item" onClick={() => { navigate("/invoices"); setShowDropdown(false); }}>
                        <FaFileInvoice /> <span>Invoices</span>
                      </div>
                      <div className="dropdown-item" onClick={() => { navigate("/change-password"); setShowDropdown(false); }}>
                        <FaKey /> <span>Change Password</span>
                      </div>
                      <hr />
                      <div className="dropdown-item logout-item" onClick={handleLogout}>
                        <FaSignOutAlt /> <span>Logout</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}