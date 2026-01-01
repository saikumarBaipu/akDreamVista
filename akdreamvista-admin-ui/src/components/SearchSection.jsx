import React from "react";
import { useNavigate } from "react-router-dom";

export default function SearchSection() {
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate("/buy");
  };

  return (
    <section className="search-section">
      <div className="search-inner">
        <div className="search-title-block">
          <p className="hd-subtitle">DISCOVER YOUR</p>
          <h2 className="hd-title">
            <span className="accent">DREAM </span>
            <span className="accent">HOUSE</span>
          </h2>
        </div>

        <form className="search-form-grid">
          <div>
            <label>Property Status</label>
            <select defaultValue="">
              <option value="">All Status</option>
             
                <option>New</option>
                <option>Resale</option>
                <option>Ready to Move</option>
                <option>Under Construction</option>
            </select>
          </div>

          <div>
            <label>Property Type</label>
            <select defaultValue="">
              <option value="">All Types</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="villa">Villa</option>
             
                <option>Independent House</option>
                
                <option>Land</option>
            </select>
          </div>

          <div>
            <label>Title</label>
            <input type="text" placeholder="Property title" />
          </div>

          <div>
            <label>Bedrooms</label>
            <select defaultValue="">
              <option value="">Any</option>
              <option value="1">1 BHK</option>
              <option value="2">2 BHK</option>
              <option value="3">3 BHK</option>
              <option value="4">4+ BHK</option>
            </select>
          </div>

          <div>
            <label>Size (SqFt)</label>
            <input type="range" min="0" max="1000" defaultValue="1000" />
          </div>

          <div>
            <label>Land Area (SqFt)</label>
            <input type="range" min="0" max="1000" defaultValue="1000" />
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
