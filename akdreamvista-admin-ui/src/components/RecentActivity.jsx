import React from "react";

const activities = [
  { text: "New property listed", time: "2 hours ago" },
  { text: "Invoice generated", time: "Yesterday" },
  { text: "Customer signup", time: "3 days ago" },
];

const RecentActivity = () => (
  <div className="card col-6" style={{ minHeight: "220px" }}>
    <h4 style={{ margin: "0 0 12px" }}>Recent Activity</h4>
    <div className="overview-list">
      {activities.map((act, i) => (
        <div key={i} className="overview-item">
          <strong>{act.text}</strong>
          <span>{act.time}</span>
        </div>
      ))}
    </div>
  </div>
);

export default RecentActivity;
