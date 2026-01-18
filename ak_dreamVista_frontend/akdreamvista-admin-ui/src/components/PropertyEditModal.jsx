import React, { useState, useEffect } from "react";
import "./PropertyEditModal.css";

export default function PropertyEditModal({ property, onClose, onUpdate }) {
  const [formData, setFormData] = useState({ ...property });
  const [loading, setLoading] = useState(false);

  // Image States
  const [imageFiles, setImageFiles] = useState([]); // New files to upload
  const [previewUrls, setPreviewUrls] = useState([]); // Mix of old strings and new Blobs
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("image");
  const [deletedImageIds, setDeletedImageIds] = useState([]);

  useEffect(() => {
    if (!property) return;
    setFormData({ ...property });

    if (property.images && Array.isArray(property.images)) {
      const urls = property.images.map((img) => img.imageUrl).filter(Boolean);
      setPreviewUrls(urls);
    } else {
      setPreviewUrls([]);
    }
  }, [property]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "youtubeLink" && value) setActiveTab("video");
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const maxSize = 5 * 1024 * 1024;

    if (previewUrls.length + files.length > 10) {
      alert("❌ Maximum 10 images allowed.");
      return;
    }

    const newFiles = [];
    const newPreviews = [];

    files.forEach((file) => {
      if (file.size <= maxSize) {
        // ✅ FIX: Attach the preview URL to the file object so we can find it later
        const previewUrl = URL.createObjectURL(file);
        file.preview = previewUrl; 
        
        newFiles.push(file);
        newPreviews.push(previewUrl);
      } else {
        alert(`❌ ${file.name} is too large.`);
      }
    });

    setImageFiles([...imageFiles, ...newFiles]);
    setPreviewUrls([...previewUrls, ...newPreviews]);
    setActiveTab("image");
  };

  const removeImage = (index) => {
    if (window.confirm("Remove this image?")) {
      const itemToRemove = previewUrls[index];
      
      // 1. Check if it's an existing image from DB
      const existingImage = property.images?.find(img => img.imageUrl === itemToRemove);

      if (existingImage) {
        setDeletedImageIds(prev => [...prev, existingImage.id]);
      } else {
        // 2. It's a new file. Use the stored .preview property to find and remove it
        setImageFiles(prev => prev.filter(file => file.preview !== itemToRemove));
      }

      // 3. Update Preview UI
      const updatedPreviews = previewUrls.filter((_, i) => i !== index);
      setPreviewUrls(updatedPreviews);

      if (currentIndex >= updatedPreviews.length) {
        setCurrentIndex(Math.max(0, updatedPreviews.length - 1));
      }
    }
  };

  const nextImage = () => setCurrentIndex((prev) => (prev === previewUrls.length - 1 ? 0 : prev + 1));
  const prevImage = () => setCurrentIndex((prev) => (prev === 0 ? previewUrls.length - 1 : prev - 1));

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!window.confirm("Save changes to this property?")) return;

    setLoading(true);
    const token = localStorage.getItem("token");
    const data = new FormData();
    
    imageFiles.forEach((file) => data.append("images", file));
    
    // Clean property data: remove the images array to prevent conflicts
    const propertyData = { ...formData };
    delete propertyData.images; 

    data.append("property", JSON.stringify(propertyData));
    data.append("deletedImageIds", JSON.stringify(deletedImageIds));

    try {
      const res = await fetch(`http://localhost:8080/api/properties/update/${property.id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
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
      alert("❌ Error connecting to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ap-modal-overlay">
      <div className="ap-container edit-mode">
        <div className="ap-header">
          <h3>Edit <span>Property</span></h3>
          <p>Update listing details and images</p>
          <button className="close-x" onClick={onClose}>&times;</button>
        </div>

        <div className="ap-content-grid glass-card">
          <form className="ap-form" onSubmit={handleSubmit}>
            <div className="ap-input-row">
              <input name="propertyCode" value={formData.propertyCode} onChange={handleChange} required />
              <input name="propertiesTitle" value={formData.propertiesTitle} onChange={handleChange} required />
            </div>

            <div className="ap-input-row">
              <input name="propertiesType" value={formData.propertiesType} onChange={handleChange} />
              <input name="landArea" value={formData.landArea} onChange={handleChange} />
            </div>

            <div className="ap-input-row">
               <input name="facing" value={formData.facing} onChange={handleChange} />
             
              <input name="floors" value={formData.floors} onChange={handleChange} />
            </div>

            <div className="ap-input-row">
              <input name="price" type="number" value={formData.price} onChange={handleChange} />
               <input name="propertyStatus" type="number" value={formData.propertyStatus} onChange={handleChange} />
              
            </div>

            <div className="ap-input-row">
              <input name="ownerContact" maxLength={10} value={formData.ownerContact} onChange={handleChange} />
              <input name="fee" type="number" placeholder="Consulting Fee" value={formData.fee} onChange={handleChange} />

              <div className="youtube-edit-wrapper">
                <input name="youtubeLink" placeholder="YouTube Link" value={formData.youtubeLink} onChange={handleChange} />
              </div>

              <label className="ap-compact-upload edit-upload">
                <i className="fa-solid fa-camera"></i>
                <span>{previewUrls.length}/10 Images</span>
                <input type="file" hidden multiple accept="image/*" onChange={handleImageUpload} />
              </label>
            </div>

            <div className="ap-actions">
              <button type="submit" className="ap-btn-submit" disabled={loading}>
                {loading ? "Updating..." : "Save Changes"}
              </button>
              <button type="button" className="ap-btn-reset" onClick={onClose}>Cancel</button>
            </div>
          </form>

          <aside className="ap-preview-section">
            <h4 className="preview-label">Live Preview</h4>
            <div className="ap-preview-card">
              <div className="ap-preview-media-box">
                {activeTab === "video" && formData.youtubeLink ? (
                  <iframe className="preview-video" src={getYoutubeEmbedUrl(formData.youtubeLink)} title="Video"></iframe>
                ) : (
                  <div className="gallery-container">
                    {previewUrls.length > 0 ? (
                      <>
                        <div className="image-counter">
                          {currentIndex + 1} / {previewUrls.length}
                        </div>

                        <img 
                          src={previewUrls[currentIndex]} 
                          alt="Property Preview" 
                          className="gallery-img-active"
                          key={currentIndex} 
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://placehold.co/600x400?text=Image+Not+Found";
                          }}
                        />

                        {previewUrls.length > 1 && (
                          <>
                            <button className="nav-btn prev" type="button" onClick={prevImage}>
                              <i className="fa-solid fa-chevron-left"></i>
                            </button>
                            <button className="nav-btn next" type="button" onClick={nextImage}>
                              <i className="fa-solid fa-chevron-right"></i>
                            </button>
                          </>
                        )}

                        <button className="remove-img-btn" type="button" onClick={() => removeImage(currentIndex)}>
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                      </>
                    ) : (
                      <div className="no-img-placeholder">
                        <i className="fa-solid fa-image"></i>
                        <p>No Images Uploaded</p>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="media-switcher">
                  <button type="button" className={activeTab === "image" ? "active" : ""} onClick={() => setActiveTab("image")}><i className="fa-solid fa-image"></i></button>
                  <button type="button" className={activeTab === "video" ? "active" : ""} onClick={() => setActiveTab("video")}><i className="fa-brands fa-youtube"></i></button>
                </div>
              </div>
              <div className="ap-preview-details">
                <span className="p-type">{formData.propertiesType || "Type"}</span>
                <h5>{formData.propertiesTitle || "Main Title"}</h5>
                <p className="p-price">₹ {formatPrice(formData.price)}</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}