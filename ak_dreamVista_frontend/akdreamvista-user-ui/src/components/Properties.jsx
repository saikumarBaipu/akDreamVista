import Layout from "../components/Layout";
import "./Properties.css";

export default function Properties() {
  const properties = [
    {
      id: 1,
      name: "3BHK Luxury Apartment",
      city: "Gachibowli, Hyderabad",
      price: "₹ 1.2 Cr",
      img: "/images/apt1.jpg",
    },
    {
      id: 2,
      name: "Independent House",
      city: "Vijayawada",
      price: "₹ 95 Lakhs",
      img: "/images/house1.jpg",
    },
    {
      id: 3,
      name: "DTCP Approved Plot",
      city: "Vizag",
      price: "₹ 15,000 / sq.yd",
      img: "/images/plot1.jpg",
    },
  ];

  return (
    <Layout>
      <h2>Properties</h2>

      <div className="filters">
        <select><option>Select City</option></select>
        <select><option>Property Type</option></select>
      </div>

      <div className="property-grid">
        {properties.map((p) => (
          <div className="property-card" key={p.id}>
            <img src={p.img} alt={p.name} className="property-img" />
            <h3>{p.name}</h3>
            <p className="city">{p.city}</p>
            <p className="price">{p.price}</p>
            <a href={`/property/${p.id}`} className="details-btn">
              View Details
            </a>
          </div>
        ))}
      </div>
    </Layout>
  );
}
