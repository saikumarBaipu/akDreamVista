import React from "react";
import { FaStar, FaUsers, FaPhone, FaFileInvoiceDollar } from "react-icons/fa";

const stats = [
  { icon: <FaStar />, label: "Total Properties", value: "1,240", bg: "sales" },
  { icon: <FaUsers />, label: "Customers", value: "3,980", bg: "users" },
  { icon: <FaPhone />, label: "Contact Requests", value: "128", bg: "#06b6d4" },
  { icon: <FaFileInvoiceDollar />, label: "Invoices", value: "412", bg: "#10b981" },
];

const DashboardStats = () => {
  return stats.map((stat, index) => (
    <div key={index} className="card col-3">
      <div className="stat">
        <div className={`icon ${stat.bg === "sales" || stat.bg === "users" ? stat.bg : ""}`} style={typeof stat.bg === "string" && stat.bg.startsWith("#") ? { background: stat.bg } : {}}>
          {stat.icon}
        </div>
        <div>
          <div className="meta">{stat.value}</div>
          <div className="muted">{stat.label}</div>
        </div>
      </div>
    </div>
  ));
};

export default DashboardStats;
