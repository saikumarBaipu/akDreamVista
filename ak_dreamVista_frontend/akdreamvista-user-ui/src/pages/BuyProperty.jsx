import React, { useEffect, useState } from "react";
import "./BuyProperty.css";
import { useNavigate, Link } from "react-router-dom";

export default function BuyProperty() {
  const navigate = useNavigate();
const [sortBy, setSortBy] = useState("Default"); // Default, LowToHigh, HighToLow
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
        const res = await fetch("http://localhost:8080/api/properties/all", { headers });
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
  const matchesIdOrTitle = 
    p.propertiesTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.propertyCode && p.propertyCode.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    matchesIdOrTitle &&
    (facing === "All" || p.facing === facing) &&
    (propType === "All" || p.propertiesType === propType) &&
    (status === "All" || p.propertyStatus === status) &&
    (p.price <= maxPrice)
  );
}).sort((a, b) => {
  if (sortBy === "LowToHigh") return a.price - b.price;
  if (sortBy === "HighToLow") return b.price - a.price;
  return 0; // Default (no sorting)
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
const formatPriceWithWords = (price) => {
  if (!price) return "₹0";
  
  // Convert to number just in case it's a string
  const num = Number(price);

  if (num >= 10000000) {
    // 1 Crore = 10,000,000
    return `₹${(num / 10000000).toFixed(2).replace(/\.00$/, "")} Cr`;
  } else if (num >= 100000) {
    // 1 Lakh = 100,000
    return `₹${(num / 100000).toFixed(2).replace(/\.00$/, "")} Lakhs`;
  }  else {
    return `₹${num}`;
  }
};
  return (
    <div className="buy-page-wrapper">
      <div className="container-main">
        <h1 className="main-page-title">BUY  
 <span style={{ color: "#fb6a19" }}> A PROPERTY</span></h1>
        {/* Filter Bar */}
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
             <option value="North">North</option>
              <option value="East">East</option>
              <option value="South">South</option>
              <option value="West">West</option>
  <option value="North-East">North East</option>
 
  <option value="South-East">South East</option>
  
  <option value="South-West">South West</option>
  
  <option value="North-West">North West</option>
            </select>

            <select className="slim-select" onChange={(e) => setPropType(e.target.value)}>
              <option value="All">All Types</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Flat">Flat</option>
  
  <option value="Independent House">Independent House</option>
  <option value="Row House">Row House</option>
  <option value="Penthouse">Penthouse</option>
  <option value="Studio Apartment">Studio Apartment</option>
  <option value="Duplex">Duplex</option>
  <option value="Triplex">Triplex</option>
  <option value="Farm House">Farm House</option>
            </select>

            <select className="slim-select" onChange={(e) => setStatus(e.target.value)}>
            <option value="All">All Status</option>
  <option value="Ready to Move">Ready to Move</option>
  <option value="Under Construction">Under Construction</option>
  <option value="New Launch">New Launch</option>
  <option value="Almost Ready">Almost Ready</option>
  <option value="Resale">Resale</option>
  <option value="Pre-Launch">Pre-Launch</option>
  <option value="Completed">Completed</option>
  <option value="Possession Started">Possession Started</option>
  <option value="Possession in 6 Months">Possession in 6 Months</option>
  <option value="Possession in 1 Year">Possession in 1 Year</option>
            </select>
<select 
      className="slim-select sort-select" 
      value={sortBy} 
      onChange={(e) => setSortBy(e.target.value)}
    >
      <option value="Default">Sort By: Newest</option>
      <option value="LowToHigh">Price: Low to High</option>
      <option value="HighToLow">Price: High to Low</option>
    </select>
           
          </div>
        </header>

        {/* Property Grid */}
       
{/* Property Grid */}
<main className="buy-main-content">
  {loading ? (
    <div className="loader-container"><div className="spinner"></div></div>
  ) : (
    <>
      <div className="property-horizontal-grid">
        {currentItems.map((p) => (
          <div key={p.id} className="premium-property-card">
            
            {/* Image Section - Correctly nested inside the parent div */}
            <div 
              className="card-media clickable" 
              onClick={() => window.open(`/property-details/${p.id}`, "_blank", "noopener,noreferrer")}
            >
              <img
                src={p.images && p.images.length > 0 
                  ? p.images[0].imageUrl 
                  : "https://placehold.co/600x400?text=No+Image+Available"}
                alt={p.propertiesTitle}
              />
              <div className="status-tag">{p.propertyCode}</div>
            </div>

            {/* Card Body - Also nested inside the same parent div */}
            <div className="card-body">
              <span className="p-category">{p.propertiesType}</span>
              <h3 className="p-title">{p.propertiesTitle}</h3>
              <p className="p-location">
                <i className="fa-solid fa-location-dot"></i> {p.facing} Facing
              </p>
              <p className="p-main-price">{formatPriceWithWords(p.price)}</p>
              
              <div className="p-features"> 
                <div className="feat-items-group">
                  <div className="feat-item">
                    <i className="fa-solid fa-ruler"></i><span>{p.landArea} SY</span>
                  </div>
                  <div className="feat-item">
                    <i className="fa-solid fa-stairs"></i><span>{p.floors} F</span>
                  </div>
                </div>
              
                <Link 
                  to={`/property-details/${p.id}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-view-btn"
                  style={{ textDecoration: 'none' }}
                >
                  View
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination remains outside the grid */}
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