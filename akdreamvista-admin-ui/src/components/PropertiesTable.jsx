import React, { useEffect, useState } from "react";
import "./PropertiesTable.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import PropertyViewModal from "./PropertyViewModal";
import { faTrash, faEye, faSpinner, faFilePdf, faEdit } from "@fortawesome/free-solid-svg-icons";
import PropertyEditModal from "./PropertyEditModal"; // Import modal

export default function PropertiesTable({ filter, onClose, mode = "NORMAL" }) {
const [editingProperty, setEditingProperty] = useState(null);
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [deletingId, setDeletingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const token = localStorage.getItem("token");
  const handleDownloadInvoice = async (propertyId) => {
  try {
    const response = await fetch(`http://3.237.234.18:8080/api/payment/invoice/property/${propertyId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Pass the token here
      },
    });

    if (!response.ok) {
      if (response.status === 403) alert("Access Denied: You are not authorized.");
      else alert("Failed to download invoice.");
      return;
    }

    // Convert response to a blob (PDF)
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    
    // Create a hidden link and click it to trigger download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `invoice_${propertyId}.pdf`);
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Download error:", error);
  }
};
// Price format helper (e.g., 1,50,000.00)
const formatPrice = (val) => {
  if (val === null || val === undefined) return "0.00";
  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(val);
};

  /* ================= FETCH PROPERTIES ================= */
  useEffect(() => {
    if (!token) {
      console.error("No token found");
      return;
    }
let url = "http://3.237.234.18:8080/api/properties/all";

    

    if (filter === "PAID_PROPERTIES") {
      url = "http://3.237.234.18:8080/api/properties/by-fee-status?paid=true";
    }
    if (filter === "UNPAID_PROPERTIES") {
      url = "http://3.237.234.18:8080/api/properties/by-fee-status?paid=false";
    }

    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (res.status === 403) {
          throw new Error("FORBIDDEN");
        }

        if (!res.ok) {
          throw new Error("Fetch failed");
        }

        const data = await res.json();
        setProperties(Array.isArray(data) ? data : []);

      } catch (err) {
        console.error("Property fetch error:", err);

        if (err.message === "FORBIDDEN") {
          alert("Session expired or access denied. Please login again.");
          localStorage.clear();
          window.location.href = "/admin-login";
        }

        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

  }, [filter, token]);

  /* ================= DELETE PROPERTY ================= */
  const deleteProperty = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;

    try {
      setDeletingId(id);

      const res = await fetch(
        `http://3.237.234.18:8080/api/properties/${id}`,
        {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      );

      if (!res.ok) throw new Error("Delete failed");

      setProperties(prev => prev.filter(p => p.id !== id));

    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete property");
    } finally {
      setDeletingId(null);
    }
  };

  /* ================= SEARCH ================= */
  const filteredData = properties.filter(p =>
    Object.values(p)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  /* ================= PAGINATION ================= */
  const start = (currentPage - 1) * itemsPerPage;
  const pageData = filteredData.slice(start, start + itemsPerPage);

  /* ================= RENDER ================= */
  return (
    <div className="table-wrapper">

      {/* HEADER */}
      <div className="table-header">
        <h3 className="table-title">
          {mode === "INVOICE" && "Invoice Properties"}
          {mode !== "INVOICE" && filter === "ALL_PROPERTIES" && "Admin Properties"}
          {mode !== "INVOICE" && filter === "PAID_PROPERTIES" && "Fee Paid Properties"}
          {mode !== "INVOICE" && filter === "UNPAID_PROPERTIES" && "Fee Pending Properties"}
        </h3>
      </div>

      {/* CONTROLS */}
      <div className="datatable-top-left">
        <div className="entries-select">
          <span>Show</span>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(+e.target.value);
              setCurrentPage(1);
            }}
          >
            {[10, 25, 50].map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
          <span>entries</span>
        </div>

        <div className="search-box">
          <input
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="table-scroll-wrapper">
        <table className="properties-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Type</th>
              <th>Price</th>
              <th>Area</th>
              <th>Facing</th>
              <th>Contact</th>
              <th>Status</th>
              <th>Fee Paid</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  <FontAwesomeIcon icon={faSpinner} spin /> Loading...
                </td>
              </tr>
            )}

            {!loading && pageData.map((p, index) => (
              <tr key={p.id}>
                <td>{start + index + 1}</td>
                <td>{p.propertiesTitle}</td>
                <td>{p.propertiesType}</td>
               <td>{formatPrice(p.price)}</td>
                <td>{p.landArea}</td>
                <td>{p.facing}</td>
                <td>{p.ownerContact}</td>
                <td>{p.propertyStatus}</td>
                <td>{p.isFeePaid ? "Yes" : "No"}</td>

                <td className="action-icons">
                  {deletingId === p.id ? (
                    
                    <FontAwesomeIcon icon={faSpinner} spin />
                  ) : (
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() => deleteProperty(p.id)}
                      style={{ cursor: "pointer" }}
                    />
                  )}
 <FontAwesomeIcon 
    icon={faEdit} 
    style={{ cursor: "pointer" }} 
    onClick={() => setEditingProperty(p)} 
  />
                  <FontAwesomeIcon
                    icon={faEye}
                    style={{ cursor: "pointer" }}
                    onClick={() => setSelectedProperty(p)}
                  />

                  {mode === "INVOICE" && p.isFeePaid && (
                   <FontAwesomeIcon
  icon={faFilePdf}
  onClick={() => handleDownloadInvoice(p.id)} // Change this line
  style={{ cursor: "pointer", color: "#e53935" }}
/>
                  )}
                 
                </td>
              </tr>
            ))}

            {!loading && pageData.length === 0 && (
              <tr>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* VIEW MODAL */}
        {selectedProperty && (
          <PropertyViewModal
            property={selectedProperty}
            onClose={() => setSelectedProperty(null)}
          />
        )}{editingProperty && (
  <PropertyEditModal 
    property={editingProperty} 
    onClose={() => setEditingProperty(null)} 
    onUpdate={(updated) => {
      setProperties(prev => prev.map(item => item.id === updated.id ? updated : item));
    }}
  />
)}
      </div>
    </div>
  );
}
