import React from "react";
import "./PageBanner.css";

export default function PageBanner({ title, subtitle }) {
  return (
    <div className="page-banner">
      <div className="page-banner-content">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </div>
  );
}
