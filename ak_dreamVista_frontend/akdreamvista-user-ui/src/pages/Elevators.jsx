import React, { useEffect } from "react";
import "./Elevators.css";

// Using your local imports
import elevators_1 from "../assets/images/elevators_1.png";
import elevators_2 from "../assets/images/elevators_2.png";
import elevators_3 from "../assets/images/elevators_3.png";
import elevators_4 from "../assets/images/elevators_4.png";
import elevators_5 from "../assets/images/elevators_5.png";
import elevators_6 from "../assets/images/elevators_6.png";
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
            img={elevators_6}
            title="Passenger Elevators"
            desc="Passenger elevators are engineered to handle the daily flow of modern high-rise apartments and high-traffic office buildings. The focus for these systems is on energy efficiency and providing a smooth, silent ride that minimizes wait times. They often feature high-end aesthetics, such as glass-walled panoramic designs, to complement the architecture of contemporary developments."
          />
          <ElevatorCard
            img={elevators_5}
            title="Home Lifts"
            desc="Specifically designed for private residences, luxury villas, and duplex homes, home lifts prioritize a small footprint and minimal structural impact. These models are often pit-less meaning they do not require deep excavation under the shaft, making them easier to install in existing homes."
          />
          <ElevatorCard
            img={elevators_4}
            title="Hospital Elevators"
            desc="Hospital elevators are mission-critical medical equipment designed specifically for the transport of stretchers and medical teams. Because patient comfort is paramount, these elevators utilize specialized drive systems to ensure entirely jerk-free starts and stops. They are characterized by extra-spacious interiors to accommodate medical beds and equipment, along with hygienic finishes that meet the strict sanitary standards of healthcare facilities."
          />
           <ElevatorCard
            img={elevators_3}
            title="Stretcher Elevators"
            desc="Designed specifically for clinics and smaller medical facilities, these elevators focus on depth rather than width. This configuration allows for the safe and efficient transport of a standard medical stretcher alongside two or three attendants. The control systems are programmed for gentle acceleration and deceleration to prevent any physical discomfort for patients during transit."
          />
          <ElevatorCard
            img={elevators_2}
            title="Bed Elevators"
            desc="These high-capacity units are engineered for major multi-specialty hospitals. They feature wide-opening telescopic doors that allow for the simultaneous entry of oversized hospital beds, oxygen cylinders, and life-support equipment. The interiors are finished with medical-grade stainless steel for easy sterilization and are equipped with backup power systems to ensure they never stall during emergency patient transfers."
          />
          <ElevatorCard
            img={elevators_1}
            title="Service & Freight Elevators"
            desc="The final category focuses on heavy-duty performance and durability. While they maintain the clean aesthetic of the hospital range, these elevators are built with reinforced flooring and wall bumpers to withstand the impact of heavy trolleys, laundry carts, and supply crates. They serve as the backbone of facility operations, ensuring that logistics move smoothly behind the scenes without interfering with patient areas."
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
          <a href="https://wa.me/8328041624" className="elv-btn-whatsapp" target="_blank" rel="noopener noreferrer">
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