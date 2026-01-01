import React, { useEffect } from 'react';
import './SellProperty.css';

const PropertySale = () => {
  useEffect(() => {
    const slpReveal = () => {
      const slpReveals = document.querySelectorAll(".slp-reveal");
      for (let i = 0; i < slpReveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = slpReveals[i].getBoundingClientRect().top;
        const elementVisible = 100;
        if (elementTop < windowHeight - elementVisible) {
          slpReveals[i].classList.add("slp-active");
        }
      }
    };

    window.addEventListener("scroll", slpReveal);
    slpReveal(); // Initial check on load

    return () => window.removeEventListener("scroll", slpReveal);
  }, []);

  return (
    <div className="slp-main-wrapper">
      {/* Hero Section */}
      <section className="slp-hero-slider">
        <div 
          className="slp-slide-bg" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1230&auto=format&fit=crop')" }}
        ></div>
        <div className="slp-hero-content">
          <div className="slp-tagline-box">Simple • Transparent • Hassle-Free</div>
          <h1>SELL YOUR <span>PROPERTY</span></h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.9, maxWidth: '700px', margin: '15px auto' }}>
            Connect directly with verified buyers quickly, securely, and without intermediaries.
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="slp-section slp-reveal" style={{ padding: '50px 40px', textAlign: 'center', borderBottom: '1px solid #eee' }}>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.7', color: '#444', maxWidth: '950px', margin: '0 auto' }}>
          Looking to sell? <strong style={{ color: '#282828' }}>AK DreamVista</strong> offers a streamlined platform connecting property owners directly with genuine buyers. 
          <span style={{ color: '#ff7800', fontWeight: 700 }}> No agents, no hidden charges</span> — just a simple, efficient way to close your deal.
        </p>
      </section>

      {/* Why Choose Us Section */}
      <section className="slp-section">
        <div style={{ textAlign: 'center', marginBottom: '50px' }} className="slp-reveal">
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800 }}>Why Property Owners Choose Us</h2>
          <div style={{ width: '60px', height: '5px', background: '#ff7800', margin: '15px auto', borderRadius: '10px', boxShadow: '0 0 10px #ff7800' }}></div>
        </div>

        <div className="slp-grid">
         
          <SLPFeatureCard 
            icon="fa-hand-holding-dollar" 
            title="Zero Brokerage" 
            desc="Retain your full profit with absolutely zero commission fees involved." 
          />
          <SLPFeatureCard 
  icon="fa-solid fa-user-lock" 
  title="Verified Listings" 
  desc="Your property is showcased exclusively to pre-vetted, serious buyers." 
/>


<SLPFeatureCard 
  icon="fa-users" 
  title="Direct Buyer Access" 
  desc="Connect instantly with verified and genuine buyers without middlemen." 
/>

          <SLPFeatureCard 
            icon="fa-map-location-dot" 
            title="Regional Reach" 
            desc="Strong digital presence targeting Hyderabad and Telangana regions." 
          />
          <SLPFeatureCard 
            icon="fa-gauge-high" 
            title="Fast Response" 
            desc="Most listings receive high-quality inquiries within the first 48 hours." 
          />
        </div>
      </section>

      {/* Trust CTA */}
      <section className="slp-trust-cta slp-reveal">
        <div className="slp-trust-info">
          <h3>We value your time, trust, and property.</h3>
          <p style={{ opacity: 0.8, fontSize: '1.1rem' }}>Our focus is to help you sell faster, smarter, and with complete transparency.</p>
        </div>
        <a href="https://wa.me/919876543210" className="slp-btn-whatsapp" target="_blank"
  rel="noopener noreferrer">
          <i className="fa-brands fa-whatsapp" style={{ fontSize: '1.5rem' }}></i> CONNECT ON WHATSAPP
        </a>
      </section>

      {/* How it Works Section - Pin-to-Pin HTML Match */}
      <section className="slp-section">
        <div style={{ textAlign: 'center', marginBottom: '60px' }} className="slp-reveal">
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800 }}>How It Works</h2>
          <div className="slp-process-line"></div>
        </div>

        <div className="slp-step-grid">
          <SLPStepItem num="1" icon="fa-clipboard-list" title="List Property" desc="Share details and photos with our team." />
          <SLPStepItem num="2" icon="fa-user-lock" title="Verification" desc="We verify listings for maximum buyer trust." />
          <SLPStepItem num="3" icon="fa-comments-dollar" title="Interaction" desc="Receive direct calls from verified buyers." />
          <SLPStepItem num="4" icon="fa-trophy" title="Close the Deal" desc="Negotiate freely and finalize with confidence." />
        </div>
      </section>

     
    </div>
  );
};

const SLPFeatureCard = ({ icon, title, desc }) => (
  <div className="slp-feature-card slp-reveal">
    <div className="slp-icon-wrap"><i className={`fa-solid ${icon}`}></i></div>
    <div>
      <h3 style={{ marginBottom: '8px' }}>{title}</h3>
      <p style={{ fontSize: '0.9rem', color: '#444' }}>{desc}</p>
    </div>
  </div>
);

const SLPStepItem = ({ num, icon, title, desc }) => (
  <div className="slp-step-item slp-reveal">
    <div className="slp-step-num">{num}</div>
    <i className={`fa-solid ${icon}`}></i>
    <h4 style={{ marginTop: '15px' }}>{title}</h4>
    <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '10px' }}>{desc}</p>
  </div>
);

export default PropertySale;