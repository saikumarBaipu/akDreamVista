import React from "react";

const PropertyCard = ({ title, location, price, image }) => {
  return (
    <div className="card">
      <img src={image} alt={title} />
      
      <div className="card-body">
        <h3>{title}</h3>
        <p><i className="fa-solid fa-location-dot"></i> {location}</p>
        <p className="price">{price}</p>
        <button className="btn">View Details</button>
      </div>
    </div>
  );
};

export default PropertyCard;
