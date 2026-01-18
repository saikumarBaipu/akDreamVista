import React, { useState } from 'react'; // Added useState import
import { NavLink, useNavigate } from "react-router-dom"; // Added useNavigate import
import "./Footer.css";

export default function Footer() {
  const navigate = useNavigate();
  const [showSecretModal, setShowSecretModal] = useState(false);
  const [inputCode, setInputCode] = useState("");
  const [error, setError] = useState("");

 
 
 

  return (
    <footer className={`ft-main-wrapper `} id="about">
      <div className="ft-container">
        
      

      
      

        <div className={`ft-bottom-bar `}>
          <p>© {new Date().getFullYear()} AK DREAM VISTA. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}