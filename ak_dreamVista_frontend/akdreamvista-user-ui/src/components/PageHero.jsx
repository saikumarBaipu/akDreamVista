import React from "react";

const PageHero = ({ title, subtitle, children, rightContent }) => {
  return (
    <section className="page-hero">
      <div className="hero-content">
        
        {/* LEFT */}
        <div>
          <h1 className="hero-title">{title}</h1>
          <p className="hero-subtitle">{subtitle}</p>
          {children}
        </div>

        {/* RIGHT */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          {rightContent}
        </div>

      </div>
    </section>
  );
};

export default PageHero;
