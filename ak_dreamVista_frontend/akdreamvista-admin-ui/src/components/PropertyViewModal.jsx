import React, { useState } from "react";
import "./PropertyViewModal.css";

export default function PropertyViewModal({ property, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("image");

  if (!property) return null;

  // Formatting helpers
  const formatPrice = (val) => {
    if (!val || isNaN(val)) return "0.00";
    const num = parseFloat(val);
    if (num >= 10000000) return (num / 10000000).toFixed(2) + " Cr";
    if (num >= 100000) return (num / 100000).toFixed(2) + " L";
    return new Intl.NumberFormat("en-IN").format(num);
  };

  const getYoutubeEmbedUrl = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
  };

  const previewUrls = property.images?.map((img) => img.imageUrl) || [];

  const nextImage = () => setCurrentIndex((prev) => (prev === previewUrls.length - 1 ? 0 : prev + 1));
  const prevImage = () => setCurrentIndex((prev) => (prev === 0 ? previewUrls.length - 1 : prev - 1));

  return (
    <div className="ap-modal-overlay" onClick={onClose}>
      <div className="ap-container view-mode" onClick={(e) => e.stopPropagation()}>
        <div className="ap-header">
          <h3>Property <span>Details</span></h3>
          <p>Full listing information and media</p>
          <button className="close-x" onClick={onClose}>&times;</button>
        </div>

        <div className="ap-content-grid glass-card">
          {/* LEFT SIDE: DETAILS */}
          <div className="ap-details-view">
            <div className="ap-info-group">
              <label>Property Title</label>
              <h4>{property.propertiesTitle}</h4>
            </div>

            <div className="ap-input-row">
              <div className="ap-info-group">
                <label>Code</label>
                <p>{property.propertyCode || "N/A"}</p>
              </div>
              <div className="ap-info-group">
                <label>Type</label>
                <p>{property.propertiesType}</p>
              </div>
            </div>

            <div className="ap-input-row">
              <div className="ap-info-group">
                <label>Land Area</label>
                <p>{property.landArea} Sq.Yds</p>
              </div>
              <div className="ap-info-group">
                <label>Facing</label>
                <p>{property.facing}</p>
              </div>
            </div>

            <div className="ap-input-row">
              <div className="ap-info-group">
                <label>Price</label>
                <p className="view-price">₹ {formatPrice(property.price)}</p>
              </div>
              <div className="ap-info-group">
                <label>Fee Status</label>
                <span className={`status-pill ${property.isFeePaid ? "paid" : "unpaid"}`}>
                  {property.isFeePaid ? "Paid" : "Pending"}
                </span>
              </div>
            </div>

            <div className="ap-info-group">
              <label>Owner Contact</label>
              <p className="contact-text">{property.ownerContact}</p>
            </div>
          </div>

          {/* RIGHT SIDE: MEDIA (MIRRORS EDIT PREVIEW) */}
          <aside className="ap-preview-section">
            <h4 className="preview-label">Media Gallery</h4>
            <div className="ap-preview-card">
              <div className="ap-preview-media-box">
                {activeTab === "video" && property.youtubeLink ? (
                  <iframe 
                    className="preview-video" 
                    src={getYoutubeEmbedUrl(property.youtubeLink)} 
                    title="Video"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <div className="gallery-container">
                    {previewUrls.length > 0 ? (
                      <>
                        <div className="image-counter">
                          {currentIndex + 1} / {previewUrls.length}
                        </div>
                        <img 
                          src={previewUrls[currentIndex]} 
                          alt="Property" 
                          className="gallery-img-active"
                        />
                        {previewUrls.length > 1 && (
                          <>
                            <button className="nav-btn prev" onClick={prevImage}>
                              <i className="fa-solid fa-chevron-left"></i>
                            </button>
                            <button className="nav-btn next" onClick={nextImage}>
                              <i className="fa-solid fa-chevron-right"></i>
                            </button>
                          </>
                        )}
                      </>
                    ) : (
                      <div className="no-img-placeholder">
                        <i className="fa-solid fa-image"></i>
                        <p>No Images Available</p>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="media-switcher">
                  <button 
                    className={activeTab === "image" ? "active" : ""} 
                    onClick={() => setActiveTab("image")}
                  >
                    <i className="fa-solid fa-image"></i>
                  </button>
                  {property.youtubeLink && (
                    <button 
                      className={activeTab === "video" ? "active" : ""} 
                      onClick={() => setActiveTab("video")}
                    >
                      <i className="fa-brands fa-youtube"></i>
                    </button>
                  )}
                </div>
              </div>
              <div className="ap-preview-details">
                <span className="p-type">{property.propertyStatus}</span>
                <h5>Listing Preview</h5>
                <p className="p-price">₹ {formatPrice(property.price)}</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}