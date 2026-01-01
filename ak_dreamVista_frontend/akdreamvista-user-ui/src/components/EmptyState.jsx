import React from "react";

const EmptyState = () => (
  <div className="card col-6" style={{ minHeight: "220px", display: "flex", justifyContent: "center", alignItems: "center" }}>
    <div className="empty">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="pulse" aria-hidden></div>
      </div>
      <h3>No urgent alerts</h3>
      <p>You're all set. Use the sidebar to navigate to other sections.</p>
    </div>
  </div>
);

export default EmptyState;
