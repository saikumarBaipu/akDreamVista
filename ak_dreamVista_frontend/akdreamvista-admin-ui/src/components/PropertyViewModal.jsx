import React, { useState } from "react";
import "./PropertyViewModal.css";

export default function PropertyViewModal({ property, onClose }) {
  if (!property) return null;

  const formatPrice = (val) => {
    if (val === null || val === undefined) return "0.00";
    return new Intl.NumberFormat("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val);
  };

  const images = Array.isArray(property.images) && property.images.length > 0
    ? property.images
    : property.propertiesImageUrl
    ? [property.propertiesImageUrl]
    : [];

  const [current, setCurrent] = useState(0);

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="ap-modal-overlay" onClick={onClose}>
      <div className="ap-modal-box" onClick={(e) => e.stopPropagation()}>
        
        <div className="ap-modal-header">
          <h3>PROPERTY <span>DETAILS</span></h3>
          <button onClick={onClose} className="ap-close-btn">✖</button>
        </div>

        <div className="ap-modal-body">
          {/* LEFT: INFO SECTION */}
          <div className="ap-modal-info">
            <div className="ap-info-grid">
              <div className="info-item">
                <label>Title</label>
                <p>{property.propertiesTitle || "N/A"}</p>
              </div>
              <div className="info-item">
                <label>Property Type</label>
                <p className="p-type-tag">{property.propertiesType || "N/A"}</p>
              </div>
              <div className="info-item">
                <label>Land Area</label>
                <p>{property.landArea || "0"} Sq.Yds</p>
              </div>
              <div className="info-item">
                <label>Facing</label>
                <p>{property.facing || "N/A"}</p>
              </div>
              <div className="info-item">
                <label>Status</label>
                <p>{property.propertyStatus || "N/A"}</p>
              </div>
              <div className="info-item">
                <label>Fee Status</label>
                <div className={`status-pill ${property.isFeePaid ? "paid" : "unpaid"}`}>
                   {property.isFeePaid ? "● Paid" : "● Unpaid"}
                </div>
              </div>
              <div className="info-item full-width">
                <label>Owner Contact</label>
                <p className="contact-p">{property.ownerContact || "N/A"}</p>
              </div>
            </div>

            {property.youtubeLink && (
              <a href={property.youtubeLink} target="_blank" rel="noreferrer" className="ap-yt-btn">
                ▶ Watch Property Video
              </a>
            )}
          </div>

          {/* RIGHT: VISUALS SECTION */}
          <div className="ap-modal-visuals">
            <div className="ap-carousel">
              {images.length > 0 ? (
                <img src={images[current]} alt="Property" />
              ) : (
                <div className="no-img-placeholder">No Image Available</div>
              )}
              
              {images.length > 1 && (
                <>
                  <button className="nav left" onClick={prevImage}>‹</button>
                  <button className="nav right" onClick={nextImage}>›</button>
                  <div className="img-counter">{current + 1} / {images.length}</div>
                </>
              )}
            </div>
            
            <div className="ap-price-card">
              <small>Price Range</small>
              <div className="price-val">₹ {formatPrice(property.price)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}