import React, { useEffect } from "react";
import "./Elevators.css";

// Using your local imports
import hospitalElevator from "../assets/images/Hospital-Elevators.webp";
import homeLift from "../assets/images/Home-Lifts.webp";
import passengerElevator from "../assets/images/Passenger-Elevators.webp";

const ElevatorServices = () => {
  useEffect(() => {
    const revealOnScroll = () => {
      document.querySelectorAll(".reveal").forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
          el.classList.add("active");
        }
      });
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();

    return () => window.removeEventListener("scroll", revealOnScroll);
  }, []);

  return (
    <div className="elv-main-wrapper">
      {/* HERO SECTION - Edge to Edge */}
      <section className="elv-hero-edge">
        <div className="elv-hero-bg" />
        <div className="elv-hero-overlay" />
        <div className="elv-hero-content reveal">
          <div className="elv-tagline">Engineered for Excellence</div>
          <h1>
            Elevators by <span>AK DreamVista</span>
          </h1>
          <p>Advanced engineering meets elegant design for seamless vertical mobility.</p>
        
        </div>
      </section>

      {/* STATS FLOATING BAR */}
      <div className="elv-stats-bar reveal">
        <div className="elv-stat">
          <strong>100%</strong>
          <span>Safety Record</span>
        </div>
        <div className="elv-stat-divider" />
        <div className="elv-stat">
          <strong>24/7</strong>
          <span>Smart Support</span>
        </div>
        <div className="elv-stat-divider" />
        <div className="elv-stat">
          <strong>10+ Yrs</strong>
          <span>Reliability</span>
        </div>
      </div>

      {/* MODELS SECTION - Zig-Zag or Grid */}
      <section id="models" className="elv-section">
        <div className="section-header reveal">
          <h2 className="elv-accent-title">Specialized Systems</h2>
          <p>Precision-built solutions for every architectural need.</p>
        </div>

        <div className="elv-grid-standard">
          <ElevatorCard
            img={passengerElevator}
            title="Passenger Elevators"
            desc="Smooth, silent & energy-efficient elevators optimized for modern apartments and high-traffic offices."
          />
          <ElevatorCard
            img={homeLift}
            title="Home Lifts"
            desc="Compact, customizable, and pit-less designs perfectly suited for luxury villas and duplex homes."
          />
          <ElevatorCard
            img={hospitalElevator}
            title="Hospital Elevators"
            desc="Hygienic, extra-spacious, and jerk-free elevators specifically designed for stretchers and medical use."
          />
        </div>
      </section>

      {/* FEATURES - Dark Texture Section */}
      <section className="elv-features-dark">
        <div className="section-header reveal light">
          <h2 className="elv-accent-title">Why AK DreamVista</h2>
          <div className="elv-dash" />
        </div>

        <div className="elv-feature-grid">
          <Feature icon="fa-shield-halved" title="Certified Safety" text="International safety standards." />
          <Feature icon="fa-palette" title="Custom Interiors" text="Elegant cabin aesthetics." />
          <Feature icon="fa-bolt-lightning" title="Eco-Efficient" text="Low power consumption." />
          <Feature icon="fa-tools" title="Pro Installation" text="Expert engineering team." />
        </div>
      </section>

      {/* CTA - Edge to Edge */}
      <section className="elv-cta-section reveal">
        <div className="elv-cta-content">
          <h2>Elevate Your Lifestyle Today</h2>
          <p>Contact our experts for a customized quote and site inspection.</p>
          <a href="https://wa.me/918328041624" className="elv-btn-whatsapp" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-whatsapp" /> INQUIRE ON WHATSAPP
          </a>
        </div>
      </section>
    </div>
  );
};

/* --- SUB-COMPONENTS --- */

const ElevatorCard = ({ img, title, desc }) => (
  <div className="elv-service-card reveal">
    <div className="elv-card-img-wrap">
      <img src={img} alt={title} />
    </div>
    <div className="elv-card-body">
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  </div>
);

const Feature = ({ icon, title, text }) => (
  <div className="elv-feat-item reveal">
    <div className="elv-feat-icon"><i className={`fa-solid ${icon}`} /></div>
    <div className="elv-feat-text">
      <h4>{title}</h4>
      <p>{text}</p>
    </div>
  </div>
);

export default ElevatorServices;