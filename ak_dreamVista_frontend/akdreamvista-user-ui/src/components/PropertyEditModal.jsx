import React, { useState, useEffect } from "react";
import "./PropertyEditModal.css";

export default function PropertyEditModal({ property, onClose, onUpdate }) {
  const [formData, setFormData] = useState({ ...property });
  const [loading, setLoading] = useState(false);
  
  // Image states
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(property?.propertiesImageUrl || "");

  useEffect(() => {
    if (property) {
      setFormData({ ...property });
      setPreviewUrl(property.propertiesImageUrl || "");
    }
  }, [property]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file)); // Show temporary preview
  };

  const formatPrice = (val) => {
    if (!val) return "0.00";
    return new Intl.NumberFormat("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");

    // FormData used to send both file and JSON data
    const data = new FormData();
    if (imageFile) {
      data.append("image", imageFile);
    }
    data.append("property", JSON.stringify(formData));

    try {
      const res = await fetch(`http://23.20.0.192:8080/api/properties/update/${property.id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: data,
      });

      if (res.ok) {
        const updatedData = await res.json();
        onUpdate(updatedData);
        alert("✅ Property Updated Successfully!");
        onClose();
      } else {
        alert("❌ Update failed.");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error connecting to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ap-modal-overlay">
      <div className="ap-container edit-mode">
        <div className="ap-header">
          <h2>Edit <span>Property</span></h2>
          <p>Update listing details and images</p>
          <button className="close-x" onClick={onClose}>&times;</button>
        </div>

        <div className="ap-content-grid glass-card">
          <form className="ap-form" onSubmit={handleSubmit}>
            <div className="ap-input-row">
              <input name="propertiesTitle" placeholder="Property Title" value={formData.propertiesTitle} onChange={handleChange} required />
              <select name="propertiesType" value={formData.propertiesType} onChange={handleChange}>
                <option value="">Property Type</option>
                <option>Apartment</option>
                <option>Independent House</option>
                <option>Villa</option>
                <option>Land</option>
              </select>
            </div>

            <div className="ap-input-row">
              <input name="landArea" placeholder="Land Area (Sq.Yards)" value={formData.landArea} onChange={handleChange} />
              <select name="facing" value={formData.facing} onChange={handleChange}>
                <option value="">Facing</option>
                <option>East</option><option>West</option><option>North</option><option>South</option>
              </select>
            </div>

            <div className="ap-input-row">
              <input name="floors" placeholder="Floors" value={formData.floors} onChange={handleChange} />
              <input name="price" type="number" placeholder="Price (₹)" value={formData.price} onChange={handleChange} />
            </div>

            <div className="ap-input-row">
              <select name="propertyStatus" value={formData.propertyStatus} onChange={handleChange}>
                <option value="">Status</option>
                <option>New</option><option>Resale</option><option>Ready to Move</option>
              </select>




              <input name="ownerContact"  placeholder="Contact (10 digits)" maxLength={10}  value={formData.ownerContact} onChange={handleChange} />
            </div>

            
            <label className="ap-upload-box">
              <i className="fa-solid fa-cloud-arrow-up"></i>
              <span>{imageFile ? imageFile.name : "Change Property Image"}</span>
              <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
            </label>

            <div className="ap-actions">
              <button type="submit" className="ap-btn-submit" disabled={loading}>
                {loading ? "Updating..." : "Save Changes"}
              </button>
              <button type="button" className="ap-btn-reset" onClick={onClose}>Cancel</button>
            </div>
          </form>

          {/* Preview Section */}
          <aside className="ap-preview-section">
            <h4 className="preview-label">Live Preview</h4>
            <div className="ap-preview-card">
              <div className="ap-preview-img-box">
                {previewUrl ? (
                  <img src={previewUrl} alt="Property" />
                ) : (
                  <div className="no-img-placeholder"><i className="fa-solid fa-image"></i></div>
                )}
              </div>
              <div className="ap-preview-details">
                <span className="p-type">{formData.propertiesType || "Type"}</span>
                <h5>{formData.propertiesTitle || "Main Title"}</h5>
                <p className="p-price">₹ {formatPrice(formData.price)}</p>
                <div className="p-stats">
                  <span><i className="fa-solid fa-compass"></i> {formData.facing}</span>
                  <span><i className="fa-solid fa-ruler-combined"></i> {formData.landArea} Sq.Y</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}