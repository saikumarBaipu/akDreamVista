import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddProperty.css";

export default function AddProperty() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [property, setProperty] = useState({
    propertyCode: "",
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

  const [imageFiles, setImageFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [activeTab, setActiveTab] = useState("image");
  const [currentIndex, setCurrentIndex] = useState(0); // For Arrow Navigation

  const handleChange = (e) => {
    setProperty({ ...property, [e.target.name]: e.target.value });
    if (e.target.name === "youtubeLink" && e.target.value) {
      setActiveTab("video");
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const maxSize = 5 * 1024 * 1024;

    // Logic: Limit to 5 images total
    if (imageFiles.length + files.length > 5) {
      alert("❌ Maximum 5 images allowed.");
      return;
    }

    const validFiles = [];
    const newPreviews = [];

    files.forEach((file) => {
      if (file.size > maxSize) {
        alert(`❌ ${file.name} is too large. Max 5MB allowed.`);
      } else {
        validFiles.push(file);
        newPreviews.push(URL.createObjectURL(file));
      }
    });

    if (validFiles.length > 0) {
      setImageFiles((prev) => [...prev, ...validFiles]);
      setPreviewUrls((prev) => [...prev, ...newPreviews]);
      setActiveTab("image");
    }
    e.target.value = ""; 
  };

  // --- Arrow Navigation Logic ---
  const nextImage = () => {
    setCurrentIndex((prev) => (prev === previewUrls.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? previewUrls.length - 1 : prev - 1));
  };

  const removeImage = (index) => {
    const confirmDelete = window.confirm("Are you sure you want to remove this image?");
    if (confirmDelete) {
      const updatedFiles = imageFiles.filter((_, i) => i !== index);
      const updatedPreviews = previewUrls.filter((_, i) => i !== index);
      setImageFiles(updatedFiles);
      setPreviewUrls(updatedPreviews);
      
      // Prevent index out of bounds
      if (currentIndex >= updatedPreviews.length) {
        setCurrentIndex(Math.max(0, updatedPreviews.length - 1));
      }
    }
  };

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

  const addProperty = async () => {
    if (!token) {
      alert("❌ Please login again.");
      navigate("/admin-login");
      return;
    }

    if (imageFiles.length === 0) {
      alert("Please upload at least one image.");
      return;
    }

    const confirmSubmit = window.confirm(`Submit this listing with ${imageFiles.length} images?`);
    if (!confirmSubmit) return;

    const formData = new FormData();
    imageFiles.forEach((file) => {
      formData.append("images", file); 
    });
    formData.append("property", JSON.stringify(property));

    try {
      const response = await fetch("http://localhost:8080/api/property/addProperty", {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        body: formData,
      });

      if (response.ok) {
        alert("Property added successfully!");
        navigate("/admin-dashboard");
      } else {
        const errorMsg = await response.text();
        alert("Failed to add property: " + errorMsg);
      }
    } catch (err) {
      alert("Server error.");
    }
  };

  return (
    <div className="ap-page-wrapper">
      <div className="ap-container">
        <div className="ap-header">
          <h1>Add <span>Property</span></h1>
          <p>Create a high-quality listing for the DreamVista inventory</p>
        </div>

        <div className="ap-content-grid glass-card">
          <form className="ap-form" onSubmit={(e) => e.preventDefault()}>
            <div className="ap-input-row">
              <input name="propertyCode" placeholder="Property ID" value={property.propertyCode} onChange={handleChange} />
              <input name="propertiesTitle" placeholder="Property Title" value={property.propertiesTitle} onChange={handleChange} />
            </div>

            <div className="ap-input-row">
              <input name="propertiesType" placeholder="Property Type" value={property.propertiesType} onChange={handleChange} />
              <input name="landArea" placeholder="Land Area (Sq.Y)" value={property.landArea} onChange={handleChange} />
            </div>

            <div className="ap-input-row">
              <input name="facing" placeholder="Facing" value={property.facing} onChange={handleChange} />
              <input name="floors" placeholder="Number of Floors" value={property.floors} onChange={handleChange} />
            </div>

            <div className="ap-input-row">
              <input name="price" type="number" placeholder="Price (₹)" value={property.price} onChange={handleChange} />
              <input name="propertyStatus" placeholder="Property Status" value={property.propertyStatus} onChange={handleChange} />
            </div>

            <div className="ap-input-row">
              <input name="ownerContact" placeholder="Owner Contact" maxLength={10} value={property.ownerContact} onChange={handleChange} />
              <input name="fee" type="number" placeholder="Consulting Fee" value={property.fee} onChange={handleChange} />
            </div>

            <div className="ap-media-upload-row">
              <div className="youtube-input-wrapper">
                <i className="fa-brands fa-youtube"></i>
                <input name="youtubeLink" placeholder="YouTube Link" value={property.youtubeLink} onChange={handleChange} />
              </div>
              <label className="ap-compact-upload">
                <i className="fa-solid fa-camera"></i>
                {/* Visual Fix: Show X/5 remaining */}
                <span>{imageFiles.length > 0 ? `${imageFiles.length}/5 Selected` : "Upload (Max 5)"}</span>
                <input type="file" hidden multiple accept="image/*" onChange={handleImageUpload} />
              </label>
            </div>

            <div className="ap-actions">
              <button className="ap-btn-submit" onClick={addProperty}>Submit Listing</button>
            </div>
          </form>

          <aside className="ap-preview-section">
            <h4 className="preview-label">Live Card Preview</h4>
            <div className="ap-preview-card">
              <div className="ap-preview-media-box">
                {activeTab === "video" && property.youtubeLink ? (
                  <iframe className="preview-video" src={getYoutubeEmbedUrl(property.youtubeLink)} title="Video"></iframe>
                ) : (
                  <div className="gallery-container">
                    {previewUrls.length > 0 ? (
                      <>
                        {/* Counter Overlay */}
                        <div className="image-counter">{currentIndex + 1} / {previewUrls.length}</div>
                        
                        <img src={previewUrls[currentIndex]} alt="preview" className="gallery-img-active" />
                        
                        {/* Navigation Arrows */}
                        {previewUrls.length > 1 && (
                          <>
                            <button className="nav-btn prev" onClick={prevImage}><i className="fa-solid fa-chevron-left"></i></button>
                            <button className="nav-btn next" onClick={nextImage}><i className="fa-solid fa-chevron-right"></i></button>
                          </>
                        )}

                        <button className="remove-img-btn" onClick={() => removeImage(currentIndex)}>
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                      </>
                    ) : (
                      <img src="https://placehold.co/600x400?text=No+Images" alt="Placeholder" />
                    )}
                  </div>
                )}

                {(property.youtubeLink || previewUrls.length > 0) && (
                  <div className="media-switcher">
                    <button className={activeTab === "image" ? "active" : ""} onClick={() => setActiveTab("image")}>
                      <i className="fa-solid fa-image"></i>
                    </button>
                    <button className={activeTab === "video" ? "active" : ""} onClick={() => setActiveTab("video")}>
                      <i className="fa-brands fa-youtube"></i>
                    </button>
                  </div>
                )}
              </div>

              <div className="ap-preview-details">
                <span className="p-type">{property.propertiesType || "TYPE"}</span>
                <h5>{property.propertiesTitle || "Property Title"}</h5>
                <p className="p-price">₹ {formatPrice(property.price)}</p>
                <div className="p-stats">
                  <div className="stat-item"><i className="fa-solid fa-compass"></i><span>{property.facing || "N/A"}</span></div>
                  <span className="stat-divider">|</span>
                  <div className="stat-item"><i className="fa-solid fa-ruler-combined"></i><span>{property.landArea || "0"} Sq.Y</span></div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}