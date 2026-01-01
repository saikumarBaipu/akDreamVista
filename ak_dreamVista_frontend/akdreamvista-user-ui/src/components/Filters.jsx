import React from "react";

const Filters = () => {
  return (
    <section className="filters">
      <input type="text" placeholder="Search properties..." />

      <select>
        <option>Select City</option>
        <option>Hyderabad</option>
        <option>Vijayawada</option>
        <option>Vizag</option>
      </select>

      <select>
        <option>Property Type</option>
        <option>Apartment</option>
        <option>Independent House</option>
        <option>Plot</option>
      </select>

      <button className="btn">Search</button>
    </section>
  );
};

export default Filters;
