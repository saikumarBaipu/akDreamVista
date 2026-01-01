import React, { useState } from 'react'; // Added useState import
import { NavLink, useNavigate } from "react-router-dom"; // Added useNavigate import
import "./Footer.css";

export default function Footer() {
  const navigate = useNavigate();
  const [showSecretModal, setShowSecretModal] = useState(false);
  const [inputCode, setInputCode] = useState("");
  const [error, setError] = useState("");

  const isAdmin = localStorage.getItem("role") === "ADMIN";
  const SECRET_CODE = "AKDV@2025"; 

  const handleAdminLinkClick = (e) => {
    e.preventDefault(); // Prevents NavLink from navigating immediately dont removeee
    setShowSecretModal(true);
  };

  const handleVerifyCode = () => {
    if (inputCode === SECRET_CODE) {
      setError("");
      setInputCode("");
      setShowSecretModal(false);
      navigate("/admin-login");
    } else {
      setError("⚠ Invalid Secret Code!");
      setInputCode("");
    }
  };

  return (
    <footer className={`ft-main-wrapper ${isAdmin ? "admin-mode" : ""}`} id="about">
      <div className="ft-container">
        
        {!isAdmin && (
          <div className="ft-grid">
            {/* Column 1: Brand & About */}
            <div className="ft-col brand-col">
              <h4 className="ft-title">AK DreamVista</h4>
              <p className="ft-text">
                We make property buying and selling simple, transparent and direct
                — no middlemen, no hidden charges. Trusted since 2016.
              </p>
              <div className="ft-admin-link">
                {/* We use an anchor tag or NavLink with onClick to trigger the modal */}
                <NavLink to="#" onClick={handleAdminLinkClick}>
                  <i className="fa fa-lock"></i> Admin Login
                </NavLink>
              </div>
            </div>

            {/* Column 2: Contact Info */}
            <div className="ft-col">
              <h4 className="ft-title">Get In Touch</h4>
              <ul className="ft-contact-list">
                <li><i className="fa fa-map-marker-alt"></i> <span>Hyderabad, Telangana, India</span></li>
                <li><i className="fa fa-phone"></i> <span>+91 8328041624</span></li>
                <li><i className="fa fa-envelope"></i> <span>info@akdreamvista.com</span></li>
              </ul>
            </div>

            {/* Column 3: Quick Links */}
            <div className="ft-col">
              <h4 className="ft-title">Quick Links</h4>
              <ul className="ft-nav-menu">
                <li><NavLink to="/about">About Us</NavLink></li>
                <li><NavLink to="/help">Contact</NavLink></li>
              </ul>
            </div>
          </div>
        )}

        {/* --- Secret Code Modal Popup --- */}
       {showSecretModal && (
  <div className="secret-modal-overlay">
    <div className="secret-modal-content">
      <h3>Admin Access</h3>
      <p>Please enter your secret credentials</p>
      
      <input 
        type="password" 
        placeholder="Secret Code" 
        value={inputCode}
        onChange={(e) => setInputCode(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleVerifyCode()}
        autoFocus
      />
      
      {error && <span className="modal-error">⚠ {error}</span>}
      
      <div className="modal-actions">
        <button 
          onClick={() => { setShowSecretModal(false); setError(""); setInputCode(""); }} 
          className="btn-cancel"
        >
          Cancel
        </button>
        <button 
          onClick={handleVerifyCode} 
          className="btn-verify"
        >
          Verify Access
        </button>
      </div>
    </div>
  </div>
)}

        <div className={`ft-bottom-bar ${isAdmin ? "ft-admin-footer" : ""}`}>
          <p>© {new Date().getFullYear()} AK DREAM VISTA. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}