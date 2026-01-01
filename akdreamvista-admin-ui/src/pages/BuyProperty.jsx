import React, { useEffect, useState } from "react";
import "./BuyProperty.css";

export default function BuyProperty() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [facing, setFacing] = useState("All");
  const [propType, setPropType] = useState("All");
  const [status, setStatus] = useState("All");
  const [maxPrice, setMaxPrice] = useState(10000000);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchProperties = async () => {
      const token = localStorage.getItem("token");
      const headers = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      try {
        const res = await fetch("http://3.237.234.18:8080/api/properties/all", { headers });
        if (res.ok) {
          const data = await res.json();
          setProperties(data);
        }
      } catch (err) {
        console.error("Network Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const filtered = properties.filter(p => {
    return (
      p.propertiesTitle.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (facing === "All" || p.facing === facing) &&
      (propType === "All" || p.propertiesType === propType) &&
      (status === "All" || p.propertyStatus === status) &&
      (p.price <= maxPrice)
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency", currency: "INR", maximumFractionDigits: 0,
    }).format(price || 0);
  };

  return (
    <div className="buy-page-wrapper">
      <div className="container-main">
        {/* Page Title */}
        <h2 className="main-page-title">BUY A PROPERTY</h2>

        {/* 1. Slim Filter Bar */}
        <header className="filter-header-card slim">
          <div className="filter-row">
            <div className="search-box-wrap">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input 
                type="text" 
                placeholder="Search Property..." 
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select className="slim-select" onChange={(e) => setFacing(e.target.value)}>
              <option value="All">All Facings</option>
              <option value="East">East</option>
              <option value="West">West</option>
              <option value="North">North</option>
              <option value="South">South</option>
              
            </select>

            <select className="slim-select" onChange={(e) => setPropType(e.target.value)}>
              <option value="All">All Types</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Flat">Flat</option>
            </select>

            <select className="slim-select" onChange={(e) => setStatus(e.target.value)}>
              <option value="All">All Status</option>
              <option value="Ready to Move">Ready to Move</option>
              <option value="Under Construction">Under Construction</option>
            </select>

            <div className="price-range-wrap">
              <span className="price-label">Max: {formatPrice(maxPrice)}</span>
              <input 
                type="range" min="100000" max="20000000" step="500000" 
                value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          </div>
        </header>

        {/* 2. Property Grid */}
        <main className="buy-main-content">
          {loading ? (
            <div className="loader-container"><div className="spinner"></div></div>
          ) : (
            <>
              <div className="property-horizontal-grid">
                {currentItems.map((p) => (
                  <div key={p.id} className="premium-property-card">
                    <div className="card-media">
                      <img src={p.propertiesImageUrl || "https://placehold.co/600x400/1a1a1a/ff6b1e?text=DreamVista"} alt={p.propertiesTitle} />
                      <div className="status-tag">{p.propertyStatus}</div>
                    </div>
                    <div className="card-body">
                      <span className="p-category">{p.propertiesType}</span>
                      <h3 className="p-title">{p.propertiesTitle}</h3>
                      <p className="p-location"><i className="fa-solid fa-location-dot"></i> {p.facing} Facing</p>
                      <p className="p-main-price">{formatPrice(p.price)}</p>
                      
                      <div className="p-features">
                        <div className="feat-items-group">
                          <div className="feat-item"><i className="fa-solid fa-ruler"></i><span>{p.landArea} SY</span></div>
                          <div className="feat-item"><i className="fa-solid fa-stairs"></i><span>{p.floors} F</span></div>
                        </div>
                        <button className="inline-view-btn" onClick={() => window.open(`/property-details/${p.id}`, "_blank")}>View</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 3. Pagination */}
              {totalPages > 1 && (
                <div className="pagination-container">
                  <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>Prev</button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button key={i} className={currentPage === i + 1 ? "active" : ""} onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
                  ))}
                  <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>Next</button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}