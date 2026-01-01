import React, { useEffect } from 'react';
import './ConstructHome.css';

const ConstructYourHome = () => {
  useEffect(() => {
    const cyhReveal = () => {
      const cyhReveals = document.querySelectorAll(".cyh-reveal");
      for (let i = 0; i < cyhReveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = cyhReveals[i].getBoundingClientRect().top;
        const elementVisible = 100;
        if (elementTop < windowHeight - elementVisible) {
          cyhReveals[i].classList.add("cyh-active");
        }
      }
    };

    window.addEventListener("scroll", cyhReveal);
    cyhReveal(); // Initial check on load

    return () => window.removeEventListener("scroll", cyhReveal);
  }, []);

  return (
    <div className="cyh-main-wrapper">
      {/* Hero Section */}
      <section className="cyh-hero-slider">
        <div 
          className="cyh-slide-bg" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1331&auto=format&fit=crop')" }}
        ></div>
        <div className="cyh-hero-content">
          <div className="cyh-tagline-box">Quality • Reliability • Perfection</div>
          <h1>CONSTRUCT YOUR <span>HOME</span></h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.9, maxWidth: '700px', margin: '15px auto' }}>
            Build your dream home with expert architects and premium construction quality.
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="cyh-section cyh-reveal" style={{ padding: '50px 40px', textAlign: 'center', borderBottom: '1px solid #eee' }}>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.7', color: '#444', maxWidth: '950px', margin: '0 auto' }}>
          Ready to build? <strong style={{ color: '#282828' }}>AK DreamVista</strong> provides end-to-end construction solutions from foundation to finishing. 
          <span style={{ color: '#ff7800', fontWeight: 700 }}> Premium Materials, Expert Labor</span> — making your dream home a reality with zero stress.
        </p>
      </section>

      {/* Why Choose Us Section */}
      <section className="cyh-section">
        <div style={{ textAlign: 'center', marginBottom: '50px' }} className="cyh-reveal">
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800 }}>Why Build With Us</h2>
          <div style={{ width: '60px', height: '5px', background: '#ff7800', margin: '15px auto', borderRadius: '10px', boxShadow: '0 0 10px #ff7800' }}></div>
        </div>

        <div className="cyh-grid">
  <CYHFeatureCard 
    icon="fa-pencil-ruler" 
    title="Custom Design" 
    desc="Work with top architects to design a layout that fits your lifestyle perfectly." 
  />
  <CYHFeatureCard 
    icon="fa-check-circle" 
    title="Quality Assurance" 
    desc="We use only A-grade materials and follow strict engineering standards." 
  />
  <CYHFeatureCard 
    icon="fa-file-contract" 
    title="Legal Compliance" 
    desc="Complete assistance with building permits, floor plans, and municipal approvals." 
  />
  <CYHFeatureCard 
    icon="fa-calendar-check" 
    title="On-Time Delivery" 
    desc="Strict project timelines to ensure you move into your home as promised." 
  />
  <CYHFeatureCard 
    icon="fa-money-bill-wave" 
    title="Fixed Pricing" 
    desc="Transparent cost estimates with no hidden charges during the build." 
  />
</div>
      </section>

      {/* Trust CTA */}
      <section className="cyh-trust-cta cyh-reveal">
        <div className="cyh-trust-info">
          <h3>Build your future on a solid foundation.</h3>
          <p style={{ opacity: 0.8, fontSize: '1.1rem' }}>Get a free consultation and customized quote for your construction project today.</p>
        </div>
        <a href="https://wa.me/919876543210" className="cyh-btn-whatsapp" target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-whatsapp" style={{ fontSize: '1.5rem' }}></i> START YOUR PROJECT
        </a>
      </section>

      {/* How it Works Section */}
      <section className="cyh-section">
        <div style={{ textAlign: 'center', marginBottom: '60px' }} className="cyh-reveal">
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800 }}>Construction Journey</h2>
          <div className="cyh-process-line"></div>
        </div>

        <div className="cyh-step-grid">
          <CYHStepItem num="1" icon="fa-compass-drafting" title="Consultation" desc="Discuss your vision, budget, and land requirements." />
          <CYHStepItem num="2" icon="fa-object-group" title="Planning" desc="Finalize 3D designs and structural blueprints." />
          <CYHStepItem num="3" icon="fa-trowel-bricks" title="Execution" desc="High-quality construction with regular site updates." />
          <CYHStepItem num="4" icon="fa-key" title="Handover" desc="Final walkthrough and handing over your dream home." />
        </div>
      </section>
    </div>
  );
};

const CYHFeatureCard = ({ icon, title, desc }) => (
  <div className="cyh-feature-card cyh-reveal">
    <div className="cyh-icon-wrap"><i className={`fa-solid ${icon}`}></i></div>
    <div>
      <h3 style={{ marginBottom: '8px' }}>{title}</h3>
      <p style={{ fontSize: '0.9rem', color: '#444' }}>{desc}</p>
    </div>
  </div>
);

const CYHStepItem = ({ num, icon, title, desc }) => (
  <div className="cyh-step-item cyh-reveal">
    <div className="cyh-step-num">{num}</div>
    <i className={`fa-solid ${icon}`}></i>
    <h4 style={{ marginTop: '15px' }}>{title}</h4>
    <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '10px' }}>{desc}</p>
  </div>
);

export default ConstructYourHome;