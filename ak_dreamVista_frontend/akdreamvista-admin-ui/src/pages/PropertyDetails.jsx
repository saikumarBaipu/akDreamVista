import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PropertyDetails.css";

export default function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  const userStr = localStorage.getItem("USER");
  const user = (userStr && userStr !== "undefined" && userStr !== "null") ? JSON.parse(userStr) : null;
  const token = localStorage.getItem("token");

  const isAdmin = user?.role === "ADMIN";

  useEffect(() => {
    fetchDetails();
    // eslint-disable-next-line
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
      setProperty(data);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async (p) => {
    if (!user || !user.id) {
      alert("Please login to proceed with payment");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/payment/create-order", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ amount: p.fee }),
      });

      const order = await res.json();

      const options = {
        key: order.key,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: "AK Dream Vista",
        description: `Consulting Fee for ${p.propertiesTitle}`,
        handler: async function (response) {
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
            await fetchDetails(); 
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

  if (loading) return <div className="loader">Loading Details...</div>;
  if (!property) return <div className="error">Property not found!</div>;

  const isUnlocked = isAdmin || property.isFeePaid === true || property.feePaid === true;

  return (
    <div className="details-wrapper">
      <div className="details-container">
        <header className="details-header">
          <h1>Property <span>Details</span></h1>
          <p>Complete information about {property.propertiesTitle}</p>
        </header>

        <div className="details-main-card">
          <div className="info-section">
            <div className="detail-grid">
              <div className="info-box"><label>Title</label><p>{property.propertiesTitle}</p></div>
              <div className="info-box"><label>Type</label><p>{property.propertiesType}</p></div>
              <div className="info-box"><label>Land Area</label><p>{property.landArea} Sq.Yds</p></div>
              <div className="info-box"><label>Facing</label><p>{property.facing}</p></div>
              <div className="info-box"><label>Floors</label><p>{property.floors}</p></div>
              <div className="info-box"><label>Status</label><p>{property.propertyStatus}</p></div>
              <div className="info-box"><label>Consulting Fee</label><p>₹{property.fee}</p></div>
              
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
                  Pay Fee ₹{property.fee} to View Contact
                </button>
              </div>
            )}

            <div className="description-box">
              {property.youtubeLink && (
                <a href={property.youtubeLink} target="_blank" rel="noreferrer" className="yt-btn">
                  <i className="fa-brands fa-youtube"></i> Watch Property Video
                </a>
              )}
            </div>
            <button className="back-home-btn" onClick={() => window.close()}>
   <i className="fa-solid fa-circle-xmark"></i> Close 
</button>
          </div>

          <div className="preview-section large-view">
            <div className="preview-card-display">
              <div className="preview-img-container large-container">
                <img src={property.propertiesImageUrl} alt="Property" />
              
              </div>
              {/* <div className="preview-body">
                <h3>₹{Number(property.price).toLocaleString("en-IN")}</h3>
                <p>{property.propertiesTitle}</p>
                <div className="preview-meta">
                   <span><i className="fa-solid fa-ruler-combined"></i> {property.landArea} SY</span>
                   <span><i className="fa-solid fa-compass"></i> {property.facing}</span>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}