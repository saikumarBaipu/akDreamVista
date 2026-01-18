import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PropertyDetails.css";

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("image"); 
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);

  const userStr = localStorage.getItem("USER");
  const user = (userStr && userStr !== "undefined" && userStr !== "null") ? JSON.parse(userStr) : null;
  const token = localStorage.getItem("token");
  const isAdmin = user?.role === "ADMIN";

  useEffect(() => {
    fetchDetails();
  }, [id]);

  const fetchDetails = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/properties/${id}`, {
        headers: {
          "Authorization": token ? `Bearer ${token}` : "",
          "Content-Type": "application/json"
        }
      });
      if (!res.ok) throw new Error("Property fetch failed");
      const data = await res.json();
      
      // Map backend images to a simple URL array
      const imageUrls = data.property.images?.map(imgObj => imgObj.imageUrl) || [];

      setProperty({ 
        ...data.property, 
        hasUserPaid: data.hasUserPaid, 
        imageUrls: imageUrls 
      });
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // --- RAZORPAY PAYMENT LOGIC ---
  const handlePayment = async (p) => {
const currentUserId = user?.id || user?.userId || user?.uid;
   if (!user || !currentUserId) {
      alert("Please login to proceed with payment");
      navigate("/login");
      return;
    }

  if (!currentUserId) {
    console.error("User object found but ID is missing:", user);
    alert("Session error: User ID not found. Please log in again.");
    return;
  }
    try {
      // 1. Create Order
      const res = await fetch("http://localhost:8080/api/payment/create-order", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ amount: p.fee }),
      });

      const order = await res.json();

      // 2. Razorpay Options
      const options = {
        key: order.key,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: "AK Dream Vista",
        description: `Consulting Fee for ${p.propertiesTitle}`,
        handler: async function (response) {
          // 3. Verify Payment
          const verifyRes = await fetch("http://localhost:8080/api/payment/verify", {
            method: "POST",
            headers: { 
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              propertyId: p.id,
              userId: user.id,            
              userEmail: user.email || "", 
              userName: user.name || "",   
            }),
          });

          if (verifyRes.ok) {
            alert("✅ Payment Successful! Owner Contact Unlocked.");
            await fetchDetails(); // Refresh UI to show contact
          } else {
            alert("❌ Payment verification failed.");
          }
        },
        prefill: { name: user.name, email: user.email },
        theme: { color: "#ff7800" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment Error:", err);
      alert("❌ Payment failed to initiate.");
    }
  };

  // Helper for Youtube
  const getYoutubeEmbedUrl = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
  };

  const nextImage = () => {
    if (property.imageUrls.length > 0) {
      setSelectedImgIndex((prev) => (prev + 1) % property.imageUrls.length);
      setActiveTab("image");
    }
  };

  const prevImage = () => {
    if (property.imageUrls.length > 0) {
      setSelectedImgIndex((prev) => (prev - 1 + property.imageUrls.length) % property.imageUrls.length);
      setActiveTab("image");
    }
  };

  if (loading) return <div className="loader">Loading Details...</div>;
  if (!property) return <div className="error">Property not found!</div>;

  const isUnlocked = isAdmin || property.hasUserPaid === true;

  return (
    <div className="details-wrapper">
      <div className="details-container">
        <header className="details-header">
          <h1>Property <span>Details</span></h1>
          <p>Complete information about {property.propertiesTitle}</p>
        </header>

        <div className="details-main-card">
          
          {/* LEFT SECTION: Info (60%) */}
          <div className="info-section">
            <div className="detail-grid">
              <div className="info-box"><label>Property Id</label><p>{property.propertyCode}</p></div>
              <div className="info-box"><label>Title</label><p>{property.propertiesTitle}</p></div>
              <div className="info-box"><label>Type</label><p>{property.propertiesType}</p></div>
              <div className="info-box"><label>Land Area</label><p>{property.landArea} SY</p></div>
              <div className="info-box"><label>Facing</label><p>{property.facing}</p></div>
              <div className="info-box"><label>Floors</label><p>{property.floors}</p></div>
              <div className="info-box"><label>Status</label><p>{property.propertyStatus}</p></div>
              <div className="info-box"><label>Fee</label><p>₹{property.fee}</p></div>

              <div className="info-box">
                <label>Price</label>
                <p>₹{Number(property.price).toLocaleString("en-IN")}</p>
              </div>

              <div className="info-box">
                <label>Owner Contact</label>
                <p className={!isUnlocked ? "blurred-text" : "unlocked-text"}>
                  {isUnlocked ? property.ownerContact : "XXXXXXXXXX"}
                </p>
              </div>
            </div>

            {!isUnlocked && (
              <div className="unlock-action">
                <p className="lock-msg">Pay consulting fee to unlock Owner Contact</p>
                <button className="pay-now-btn" onClick={() => handlePayment(property)}>
                  <i className="fa-solid fa-lock-open"></i> Pay Fee ₹{property.fee} to View Contact
                </button>
              </div>
            )}

            <div className="action-footer">
               <button className="back-home-btn" onClick={() => window.close()}>
                  <i className="fa-solid fa-circle-xmark"></i> Close Tab
               </button>
            </div>
          </div>

          {/* RIGHT SECTION: Gallery (40%) */}
          <div className="preview-section">
            <div className="main-viewer">
              <div className="media-type-selectors">
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

              {activeTab === "video" && property.youtubeLink ? (
                <iframe 
                  className="viewer-frame" 
                  src={getYoutubeEmbedUrl(property.youtubeLink)} 
                  title="Property Video" 
                  frameBorder="0" 
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="main-img-holder">
                  {property.imageUrls.length > 1 && (
                    <>
                      <button className="main-nav-btn prev" onClick={prevImage}><i className="fa-solid fa-chevron-left"></i></button>
                      <button className="main-nav-btn next" onClick={nextImage}><i className="fa-solid fa-chevron-right"></i></button>
                    </>
                  )}
                  <div className="image-counter">
                    {property.imageUrls.length > 0 ? `${selectedImgIndex + 1}/${property.imageUrls.length}` : "0/0"}
                  </div>
                  <img 
                    className="viewer-img" 
                    src={property.imageUrls[selectedImgIndex] || "https://placehold.co/600x400"} 
                    alt="Property" 
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}