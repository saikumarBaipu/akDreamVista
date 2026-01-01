import React from "react";
import Navbar from "../components/Navbar";
import Filters from "../components/Filters";
import PropertyCard from "../components/PropertyCard";

const Dashboard = () => {
  const properties = [
    {
      title: "3BHK Luxury Apartment",
      location: "Gachibowli, Hyderabad",
      price: "₹ 1.2 Cr",
      image: "https://via.placeholder.com/350x200",
    },
    {
      title: "Independent House",
      location: "Vijayawada",
      price: "₹ 95 Lakhs",
      image: "https://via.placeholder.com/350x200",
    },
    {
      title: "DTCP Approved Plot",
      location: "Vizag",
      price: "₹ 15,000 / sq.yd",
      image: "https://via.placeholder.com/350x200",
    },
  ];

  return (
    <>
      <Navbar />
      <Filters />

      <section className="property-grid">
        {properties.map((item, index) => (
          <PropertyCard
            key={index}
            title={item.title}
            location={item.location}
            price={item.price}
            image={item.image}
          />
        ))}
      </section>
    </>
  );
};

export default Dashboard;
