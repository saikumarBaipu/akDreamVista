import React, { useEffect } from 'react';
import './Help.css';

const DemoPage = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("ak-help-show");
      });
    }, { threshold: 0.1 });

    document.querySelectorAll(".ak-help-reveal").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="ak-help-container">
      {/* Minimalist Header */}
      <section className="ak-help-header ak-help-reveal">
        <div className="ak-help-wrapper">
          <span className="ak-help-eyebrow">Customer Care</span>
          <h1>How can we <span>assist you?</span></h1>
          <p>Get instant support for your AK DreamVista installations and services.</p>
        </div>
      </section>

      {/* Main Support Grid */}
      <section className="ak-help-wrapper">
        <div className="ak-help-grid">
          <HelpCard 
            icon="fa-screwdriver-wrench" 
            title="Technical Support" 
            desc="Report a breakdown or request maintenance for your elevator."
          />
          <HelpCard 
            icon="fa-file-shield" 
            title="AMC & Warranty" 
            desc="Check your Annual Maintenance Contract status and safety certifications."
          />
          <HelpCard 
            icon="fa-clipboard-question" 
            title="General Inquiry" 
            desc="Have questions about new installations or pricing? We're here to help."
          />
        </div>
      </section>

      {/* Contact Section */}
      <section className="ak-help-contact-area ak-help-reveal">
        <div className="ak-help-wrapper">
          <div className="ak-help-cta-box">
            <div className="ak-help-cta-info">
              <h3>Direct Assistance</h3>
              <p>Our technical team is available 24/7 for emergency repairs.</p>
            </div>
            <div className="ak-help-actions">
              <a href="tel:+919876543210" className="ak-help-btn-tel">
                <i className="fa-solid fa-phone-volume"></i> +91 98765 43210
              </a>
              <a href="https://wa.me/919876543210" className="ak-help-btn-wa" target="_blank"
  rel="noopener noreferrer">
                <i className="fa-brands fa-whatsapp"></i> Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const HelpCard = ({ icon, title, desc }) => (
  <div className="ak-help-card ak-help-reveal">
    <div className="ak-help-icon-circle"><i className={`fa-solid ${icon}`}></i></div>
    <h3>{title}</h3>
    <p>{desc}</p>
    <a href="#" className="ak-help-text-link">Learn More <i className="fa-solid fa-arrow-right"></i></a>
  </div>
);

export default HelpPage;