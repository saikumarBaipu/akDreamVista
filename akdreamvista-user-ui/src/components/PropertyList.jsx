import React, { useEffect, useState } from "react";
import "./PropertyList.css";

export default function PropertyList() {
  const [properties, setProperties] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 1. Fetch Data
  useEffect(() => {
    fetch("http://3.237.234.18:8080/api/properties/all")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => setProperties(data || []))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // 2. Optimized Auto-slide Logic
  useEffect(() => {
    if (properties.length <= 1) return;

    const cardWidthWithGap = 355; // 330px card + 25px gap
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
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
        <h2>FIND A PROPERTY</h2>
        <p>BROWSE OUR DREAM HOUSE</p>
      </div>

      <div className="slider-viewport">
        <div
          className="slider-track"
          style={{
            transform: `translateX(-${currentIndex * 355}px)`,
          }}
        >
          {properties.length > 0 ? (
            properties.map((p) => (
              <article key={p.id} className="property-card">
                <div className="property-image-wrapper">
                  <img
                    src={p.propertiesImageUrl || "https://placehold.co/330x180?text=No+Image"}
                    alt={p.propertiesTitle}
                  />
                  <span className="property-status">{p.propertyStatus || "Available"}</span>
                </div>

                <div className="property-content">
                  <h3 className="property-title">{p.propertiesTitle}</h3>

                  <div className="property-meta">
                    <span>
                      <i className="fa fa-tag" /> {p.propertiesType}
                    </span>
                    <span>
                      <i className="fa fa-calendar" />{" "}
                      {p.createdAt ? new Date(p.createdAt).toLocaleDateString() : "Recently"}
                    </span>
                  </div>

                  <p className="property-excerpt">{p.description}</p>
                </div>
              </article>
            ))
          ) : (
            <p className="loading-text">Loading properties...</p>
          )}
        </div>
      </div>
    </section>
  );
}