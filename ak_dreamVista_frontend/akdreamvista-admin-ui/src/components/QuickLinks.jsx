import React from "react";
import { FaPlus, FaUsers, FaFileInvoice } from "react-icons/fa";

const links = [
  { icon: <FaPlus style={{ color: "var(--brand)" }} />, text: "Add Property", href: "/add-property" },
  { icon: <FaUsers style={{ color: "#4f46e5" }} />, text: "View Customers", href: "/customers" },
  { icon: <FaFileInvoice style={{ color: "#10b981" }} />, text: "Invoices", href: "/invoice" },
];

const QuickLinks = () => (
  <div className="card col-12" style={{ padding: "20px" }}>
    <h4 style={{ margin: "0 0 12px" }}>Quick Links</h4>
    <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
      {links.map((link, i) => (
        <a key={i} href={link.href} className="card" style={{ display: "flex", gap: "10px", alignItems: "center", borderRadius: "10px", padding: "12px 14px", textDecoration: "none", color: "inherit" }}>
          {link.icon} {link.text}
        </a>
      ))}
    </div>
  </div>
);

export default QuickLinks;
