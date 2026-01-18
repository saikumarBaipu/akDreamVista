import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchSection.css"; // CSS check 

export default function SearchSection() {
  const navigate = useNavigate();
  
 
  const [size, setSize] = useState(1000);
  const [landArea, setLandArea] = useState(1000);

  const handleSearch = () => {
    
    navigate("/buy");
  };

  return (
    <section className="search-section">
      <div className="search-inner">
        <div className="search-title-block">
          <p className="hd-subtitle">DISCOVER YOUR</p>
          <h2 className="hd-title">
         
            <span style={{ color: "#fb6a19" }}>DREAM HOUSE</span>
          </h2>
        </div>

        <form className="search-form-grid">
          {/* 1. Property ID */}
          <div>
            <label>Property ID</label>
            <input type="text" placeholder="Ex: AK101" />
          </div>

         

          {/* 3. Property Status */}
          <div>
            <label>Property Status</label>
             <input type="text" placeholder="Property Status" />
           
          </div>

          {/* 4. Property Type */}
          <div>
            <label>Property Type</label>
             <input type="text" placeholder="Property Type" />
          </div>

        

          <div className="search-submit">
            <button
              type="button"
              className="search-button"
              onClick={handleSearch}
            >
              <i className="fa fa-search" /> Search
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}