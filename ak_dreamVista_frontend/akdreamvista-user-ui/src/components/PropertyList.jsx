import React, { useEffect, useState } from "react";
import "./PropertyList.css";
import { useNavigate } from "react-router-dom";

export default function PropertyList() {
  const [properties, setProperties] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const formatPriceWithWords = (price) => {
    if (!price) return "₹0";
    const num = Number(price);
    if (num >= 10000000) {
      return `₹${(num / 10000000).toFixed(2).replace(/\.00$/, "")} Cr`;
    } else if (num >= 100000) {
      return `₹${(num / 100000).toFixed(2).replace(/\.00$/, "")} Lakhs`;
    } else {
      return `₹${num}`;
    }
  };

  useEffect(() => {
    fetch("http://localhost:8080/api/properties/all")
      .then((res) => res.json())
      .then((data) => setProperties(data || []))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  useEffect(() => {
    if (properties.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const cardWidthWithGap = 355; 
        const cardsInView = Math.floor(window.innerWidth / cardWidthWithGap) || 1;
        const maxIndex = Math.max(0, properties.length - cardsInView);
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [properties.length]);

  return (
    <section className="section">
      <div className="section-heading">
         <h2 className="main-page-title">FIND  
 <span style={{ color: "#fb6a19" }}> A PROPERTY</span></h2>
      
      </div>

      <div className="slider-viewport">
        <div
          className="slider-track"
          style={{ transform: `translateX(-${currentIndex * 355}px)` }}
        >
          {properties.map((p) => (
            <article key={p.id} className="premium-property-card slider-card-fix">
              <div 
                className="card-media clickable" 
                onClick={() => window.open(`/property-details/${p.id}`, "_blank", "noopener,noreferrer")}
              >
                {/* UPDATED IMAGE LOGIC: Pick the first image from the list */}
                <img
                  src={p.images && p.images.length > 0 
                    ? p.images[0].imageUrl 
                    : "https://placehold.co/600x400?text=No+Image+Available"}
                  alt={p.propertiesTitle}
                />
                <div className="status-tag">{p.propertyCode || "NEW"}</div>
              </div>

              <div className="card-body">
                <div className="status-tag-inline">{p.propertyStatus}</div>
                <span className="p-category">{p.propertiesType}</span>
                <h3 className="p-title">{p.propertiesTitle}</h3>
                <p className="p-location">
                  <i className="fa-solid fa-location-dot"></i> {p.facing} Facing
                </p>
                <p className="p-main-price">{formatPriceWithWords(p.price)}</p>

                <div className="p-features">
                  <div className="feat-items-group">
                    <div className="feat-item">
                      <i className="fa-solid fa-ruler"></i>
                      <span>{p.landArea} SY</span>
                    </div>
                    <div className="feat-item">
                      <i className="fa-solid fa-stairs"></i>
                      <span>{p.floors} F</span>
                    </div>
                  </div>
                  
                  <a 
                    href={`/property-details/${p.id}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-view-btn"
                    style={{ textDecoration: 'none' }}
                  >
                    View
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}