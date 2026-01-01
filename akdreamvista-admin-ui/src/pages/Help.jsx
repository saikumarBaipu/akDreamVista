import React, { useEffect } from 'react';
import './Help.css';

const HelpPage = () => {
  useEffect(() => {
    const hReveal = () => {
      const reveals = document.querySelectorAll(".h-reveal");
      reveals.forEach((el) => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - 80) {
          el.classList.add("h-active");
        }
      });
    };
    window.addEventListener("scroll", hReveal);
    hReveal();
    return () => window.removeEventListener("scroll", hReveal);
  }, []);

  return (
    <div className="h-full-page">
      {/* 1. HERO SECTION (Edge-to-Edge) */}
      <section className="h-hero-edge h-reveal">
        <div className="h-hero-overlay"></div>
        <div className="h-hero-inner">
          <div className="h-tagline-edge">Customer Care • 24/7 Support</div>
          <h1>How Can We <span>Assist You?</span></h1>
          <p>The premium support center for all your AK DreamVista services.</p>
        </div>
      </section>

      {/* 2. TECHNICAL SUPPORT: Text Left - Image Right */}
      <section className="h-row h-reveal">
        <div className="h-content-box">
          <div className="h-text-side">
            <div className="h-icon-box"><i className="fa-solid fa-screwdriver-wrench"></i></div>
            <h2 className="h-title-edge">Technical Support</h2>
            <p>Experience zero downtime with our expert technical team. We provide rapid response for elevator maintenance and structural repairs.</p>
            <ul className="h-list-edge">
              <li><i className="fa-solid fa-check"></i> 24/7 Emergency Breakdown Support</li>
              <li><i className="fa-solid fa-check"></i> Periodic Maintenance Checks</li>
              <li><i className="fa-solid fa-check"></i> Original Spare Parts Replacement</li>
            </ul>
          </div>
          <div className="h-image-side">
            <div className="h-frame-standard">
              <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop" alt="Tech Support" />
            </div>
          </div>
        </div>
      </section>

      

      {/* 4. GENERAL INQUIRY: Text Left - Image Right */}
      <section className="h-row h-reveal">
        <div className="h-content-box">
          <div className="h-text-side">
            <div className="h-icon-box"><i className="fa-solid fa-clipboard-question"></i></div>
            <h2 className="h-title-edge">General Inquiry</h2>
            <p>Looking for a new installation or pricing details? Our consultants are ready to guide you through the best mobility solutions for your project.</p>
            <a href="tel:+918328041624" className="h-btn-main">Talk to Consultant</a>
          </div>
          <div className="h-image-side">
            <div className="h-frame-standard">
              <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2074&auto=format&fit=crop" alt="Inquiry" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. CONTACT CTA (Edge-to-Edge Dark) */}
      <section className="h-cta-edge h-reveal">
        <div className="h-cta-inner">
          <h3>Emergency Assistance Needed?</h3>
          <p>Connect with our technical desk instantly.</p>
          <div className="h-actions">
           
            <a href="https://wa.me/918328041624" className="h-btn-wa" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-whatsapp"></i> WHATSAPP
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HelpPage;