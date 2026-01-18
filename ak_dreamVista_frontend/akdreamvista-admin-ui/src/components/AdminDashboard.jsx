import React, { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import PropertiesTable from "./PropertiesTable";
import UsersTable from "./UsersTable";
import "./AdminDashboard.css";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

export default function AdminDashboard() {
  const location = useLocation();
  const token = localStorage.getItem("token");

  const [activeTable, setActiveTable] = useState(null);
  const [viewMode, setViewMode] = useState("DASHBOARD");
  const [counts, setCounts] = useState({
    total: 0,
    paid: 0,
    unpaid: 0,
    users: 0
  });

  /* ================= FETCH COUNTS (SAFE) ================= */
  const fetchCounts = useCallback(async () => {
    if (!token) return;

    try {
      const [propertyRes, userRes] = await Promise.all([
        fetch("http://localhost:8080/api/properties/count", {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch("http://localhost:8080/api/user/count", {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      if (!propertyRes.ok) {
  throw new Error("Property count fetch failed");
}

const propertyCounts = await propertyRes.json();

      const userCounts = await userRes.json();

      setCounts({
        total: propertyCounts.total ?? 0,
        paid: propertyCounts.paid ?? 0,
        unpaid: propertyCounts.unpaid ?? 0,
        users: userCounts.total ?? 0
      });

    } catch (err) {
      console.error("Count fetch failed:", err);
      setCounts({ total: 0, paid: 0, unpaid: 0, users: 0 });
    }
  }, [token]);

  useEffect(() => {
    fetchCounts();
  }, [fetchCounts]);

  /* ================= HEADER MENU CLICK ================= */
  useEffect(() => {
    if (location.state?.openTable) {
      setActiveTable(location.state.openTable);
      setViewMode("MENU");
    } else if (location.state?.usersOnly) {
      setActiveTable("USERS");
      setViewMode("MENU");
    }
  }, [location.state]);

  /* ================= CARD CLICK ================= */
  const handleCardClick = (tableKey) => {
    setActiveTable(tableKey);
    setViewMode("CARD");
  };

  /* ================= BACK ================= */
  const backToStats = () => {
    setActiveTable(null);
    setViewMode("DASHBOARD");
  };

  /* ================= CHART DATA ================= */
  const pieData = {
    labels: ["Paid", "Pending"],
    datasets: [{
    data: [counts.paid, counts.unpaid],
    backgroundColor: ["#05cd99", "#ff7800"],
    hoverOffset: 15, // Creates a premium pop-out effect on hover
    borderWidth: 4,
    borderColor: "#ffffff" // Adds a clean gap between segments
  }]
  };

  const barData = {
    labels: ["Properties", "Customers"],
    datasets: [
      {
        label: "Total",
        data: [counts.total, counts.users],
        backgroundColor: ["#4318ff", "#ff7800"],
        borderRadius: 8
      }
    ]
  };

  return (
    <div className="admin-dashboard-wrapper">
      <div className="admin-container">

        {/* ================= HEADER ================= */}
        <header className="admin-header">
          <h1>Admin <span>Dashboard</span></h1>

          {viewMode !== "DASHBOARD" && (
            <button className="back-btn" onClick={backToStats}>
             
              Back to Stats
            </button>
          )}
        </header>

        {/* ================= STATS CARDS ================= */}
        {(viewMode === "DASHBOARD" || viewMode === "CARD") && (
          <div className="stats-horizontal-container">
            <StatCard label="Total Properties" value={counts.total} icon="fa-city" color="blue"
              onClick={() => handleCardClick("ALL_PROPERTIES")} />

            <StatCard label="Fee Paid" value={counts.paid} icon="fa-circle-check" color="green"
              onClick={() => handleCardClick("PAID_PROPERTIES")} />

            <StatCard label="Fee Pending" value={counts.unpaid} icon="fa-file-invoice-dollar" color="orange"
              onClick={() => handleCardClick("UNPAID_PROPERTIES")} />

            <StatCard label="Customers" value={counts.users} icon="fa-user-tie" color="purple"
              onClick={() => handleCardClick("USERS")} />
          </div>
        )}

        {/* ================= CHARTS ================= */}
        {viewMode === "DASHBOARD" && (
          <div className="dashboard-visuals">

            <div className="chart-card">
              <h3>Payment Status</h3>
              <div className="chart-container">
                <Pie data={pieData} />
              </div>
            </div>

            <div className="chart-card">
              <h3>Inventory Overview</h3>
              <div className="chart-container">
                <Bar data={barData} />
              </div>
            </div>

          </div>
        )}

        {/* ================= TABLES ================= */}
        {activeTable && (
          <div className="table-content-area">
            {activeTable === "USERS" ? (
              <UsersTable onClose={backToStats} />
            ) : (
              <PropertiesTable
                filter={activeTable}
                mode={activeTable === "INVOICES" ? "INVOICE" : "NORMAL"}
                onClose={backToStats}
                onDataChange={fetchCounts}
              />
            )}
          </div>
        )}

      </div>
    </div>
  );
}

/* ================= STAT CARD ================= */
const StatCard = ({ label, value, icon, color, onClick }) => (
  /* Color prop (blue, green, orange, purple) ni base cheskuni class select avthundi */
  <div className={`dash-card card-${color}`} onClick={onClick}>
    <div className="card-content">
      <span className="card-label">{label}</span>
      <h3 className="card-value">{value}</h3>
    </div>
    <div className="card-icon-wrapper">
      <i className={`fa-solid ${icon}`}></i>
    </div>
  </div>
);
