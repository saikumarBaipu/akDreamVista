import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddProperty.css";

export default function AddProperty() {
  const navigate = useNavigate();

  const [property, setProperty] = useState({
    propertiesTitle: "",
    propertiesType: "",
    landArea: "",
    facing: "",
    floors: "",
    price: "",
    propertyStatus: "",
    ownerContact: "",
    fee: "",
    youtubeLink: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const handleChange = (e) => {
    setProperty({ ...property, [e.target.name]: e.target.value });
  };

  // Helper for 1,000.00 formatting
  const formatPrice = (val) => {
    if (!val) return "0.00";
    return new Intl.NumberFormat("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setProperty({
      propertiesTitle: "",
      propertiesType: "",
      landArea: "",
      facing: "",
      floors: "",
      price: "",
      propertyStatus: "",
      ownerContact: "",
      fee: "",
      youtubeLink: "",
    });
    setImageFile(null);
    setPreviewUrl("");
  };

  const addProperty = async () => {
    if (!imageFile) return alert("⚠ Please upload an image");
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("property", JSON.stringify(property));

    try {
      const response = await fetch("http://localhost:8080/api/property/addProperty", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) throw new Error("Unauthorized");

      alert("✅ Property added successfully!");
      navigate("/admin-dashboard");
    } catch (err) {
      alert("❌ Session expired. Please login again.");
    }
  };

  return (
    <div className="ap-page-wrapper">
      <div className="ap-container">
        <div className="ap-header">
          <h2>Add <span>Property</span></h2>
          <p>Create a high-quality listing for the DreamVista inventory</p>
        </div>

        <div className="ap-content-grid glass-card">
          {/* Form Section */}
          <form className="ap-form" onSubmit={(e) => e.preventDefault()}>
            <div className="ap-input-row">
              <input name="propertiesTitle" placeholder="Property Title" value={property.propertiesTitle} onChange={handleChange} />
              <select name="propertiesType" value={property.propertiesType} onChange={handleChange}>
                <option value="">Property Type</option>
                <option>Apartment</option>
                <option>Independent House</option>
                <option>Villa</option>
                <option>Land</option>
              </select>
            </div>

            <div className="ap-input-row">
              <input name="landArea" placeholder="Land Area (Sq.Yards)" value={property.landArea} onChange={handleChange} />
              <select name="facing" value={property.facing} onChange={handleChange}>
                <option value="">Facing</option>

  <option>East</option>
              <option>West</option>
              <option>North</option>
              <option>South</option>
               <option>North-East</option>
  <option>North-West</option>
  <option>South-East</option>
  <option>South-West</option>


                
              </select>
            </div>

            <div className="ap-input-row">
              <input name="floors" placeholder="Number of Floors" value={property.floors} onChange={handleChange} />
              <input name="price" type="number" placeholder="Price (₹)" value={property.price} onChange={handleChange} />
            </div>

            <div className="ap-input-row">
              <select name="propertyStatus" value={property.propertyStatus} onChange={handleChange}>
                <option value="">Property Status</option>
                <option>New</option>
                <option>Resale</option>
                <option>Ready to Move</option>
                <option>Under Construction</option>
              </select>
              <input name="ownerContact" placeholder="Owner Contact" maxLength={10} value={property.ownerContact} onChange={(e) => /^\d*$/.test(e.target.value) && handleChange(e)} />
            </div>

            <div className="ap-input-row">
              <input name="fee" type="number" placeholder="Consulting Fee" value={property.fee} onChange={handleChange} />
              <input name="youtubeLink" placeholder="YouTube Link (Optional)" value={property.youtubeLink} onChange={handleChange} />
            </div>

            <label className="ap-upload-box">
              <i className="fa-solid fa-cloud-arrow-up"></i>
              <span>{imageFile ? imageFile.name : "Select Property Image"}</span>
              <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
            </label>

            <div className="ap-actions">
              <button className="ap-btn-submit" onClick={addProperty}>Submit </button>
              <button className="ap-btn-reset" onClick={resetForm}>Reset</button>
            </div>
          </form>

          {/* Preview Section */}
          <aside className="ap-preview-section">
            <h4 className="preview-label">Card Preview</h4>
            <div className="ap-preview-card">
             <div className="ap-preview-img-box">
  {previewUrl ? (
    <img 
      src={previewUrl} 
      alt="Property" 
      onError={(e) => {
        // If image fails to load, show a nice placeholder
        e.target.onerror = null; 
        e.target.src = "https://placehold.co/600x400/1a1a1a/ff7800?text=DreamVista+Property";
      }}
    />
  ) : (
    <div className="no-img-placeholder">
      <i className="fa-solid fa-image"></i>
    </div>
  )}
</div>
              <div className="ap-preview-details">
                <span className="p-type">{property.propertiesType || "Type"}</span>
                <h5>{property.propertiesTitle || "Main Property Title"}</h5>
                <p className="p-price">₹ {formatPrice(property.price)}</p>
                <div className="p-stats">
                  <span><i className="fa-solid fa-compass"></i> {property.facing || "N/A"}</span>
                  <span><i className="fa-solid fa-ruler-combined"></i> {property.landArea || "0"} Sq.Y</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}