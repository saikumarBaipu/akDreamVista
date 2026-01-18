import React, { useEffect } from 'react';
import './About.css';
import our_vision_about from "../assets/images/our_vision_about.png"; 
import whyImage from "../assets/images/why_us.png"; 
import Founder from "../assets/images/founder.jpg";
import our_mission from "../assets/images/our_mission.png";
import aout_us from "../assets/images/aout_us.png"; 
 

const About = () => {
  useEffect(() => {
    const abtReveal = () => {
      const abtReveals = document.querySelectorAll(".abt-reveal");
      abtReveals.forEach((el) => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - 80) {
          el.classList.add("abt-active");
        }
      });
    };
    window.addEventListener("scroll", abtReveal);
    abtReveal(); 
    return () => window.removeEventListener("scroll", abtReveal);
  }, []);

  return (
    <div className="abt-full-page">
      {/* Hero Section */}
      <section className="abt-hero-edge">
        <div className="abt-hero-overlay"></div>
        <div className="abt-hero-inner abt-reveal">
          <div className="abt-tagline-edge">Trusted Since 2016 • Verified • Direct</div>
          <h1>ABOUT <span>AK DREAMVISTA</span></h1>
          <p>The bridge between your dreams and reality.</p>
        </div>
      </section>

     {/* 1. Our Story */}
      <section className="abt-row abt-reveal">
        <div className="abt-content-box">
          <div className="abt-text-side">
            <h2 className="abt-title-edge">Our Story</h2>
            <p>Welcome to <strong>AK DreamVista</strong>, your trusted digital platform for genuine real estate connections. Founded in 2016, we have grown into one of the most reliable platforms in Telangana.</p>
            <p>We simplify property deals by connecting you directly with owners—removing high brokerage fees and hidden complexities.</p>
          </div>
          <div className="abt-image-side">
            <div className="abt-frame-standard">
              <img src={aout_us} alt="Our Story" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Our Vision - NOW MATCHES DIMENSIONS */}
      <section className="abt-row abt-bg-alt abt-reveal">
        <div className="abt-content-box abt-reverse">
          <div className="abt-text-side">
            <h2 className="abt-title-edge">Our Vision</h2>
            <p>At its heart, this vision is about empowering the individual. By removing intermediaries, the marketplace transitions from a gatekeeper model to an open-access ecosystem. This direct connection ensures that information—such as pricing, property history, and legal status—is shared in real-time, eliminating the "information asymmetry" that often leads to mistrust in traditional real estate. The focus is not just on the transaction, but on the integrity of the connection, where safety is guaranteed through verified profiles and secure digital handshakes.</p>
          </div>
          <div className="abt-image-side">
            <div className="abt-frame-standard">
              <img src={our_vision_about} alt="Our Vision" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Mission */}
      <section className="abt-row abt-reveal">
        <div className="abt-content-box">
          <div className="abt-text-side">
            <h2 className="abt-title-edge">Our Mission</h2>
            <p>In a digital marketplace, data integrity is everything. Our mission starts with ensuring that every property on the platform is exactly what it claims to be. We replace the "bait-and-switch" tactics of traditional classifieds with a rigorous verification process. This means every listing is cross-checked for authenticity, ensuring that images are recent and descriptions are accurate. By maintaining an up-to-date database, we save users from the frustration of inquiring about sold or unavailable properties, creating a high-velocity environment where trust is built into every click.</p>
           
          </div>
          <div className="abt-image-side">
            <div className="abt-frame-standard">
  <img src={our_mission} alt="Our Mission" />
            </div>
          </div>
        </div>
      </section>

     {/* 4. Our Founder - NOW MATCHES DIMENSIONS */}
      <section className="abt-row abt-bg-alt abt-reveal">
        <div className="abt-content-box abt-reverse">
          <div className="abt-text-side">
            <h2 className="abt-title-edge">Our Founder</h2>
            <p>Founded by <strong>Anil Kumar</strong>, an entrepreneur passionate about bringing honesty and innovation to the real estate market.</p>
            <p>His vision is to make property transactions smooth, digital, and transparent for everyone across India.</p>
          </div>
          <div className="abt-image-side">
            {/* Changed from abt-frame-founder to abt-frame-standard for symmetry */}
            <div className="abt-frame-standard">
               <img src={Founder} alt="Founder Us" />
            </div>
          </div>
        </div>
      </section>
      {/* 5. Why Choose Us: Text Left - Image Right (Zig-Zag) */}
     <section className="abt-row abt-reveal">
        <div className="abt-content-box">
          <div className="abt-text-side">
            <h2 className="abt-title-edge">Why Choose Us</h2>
            <div className="abt-stats-edge">
              <div className="abt-stat-item">🏡 Since 2016</div>
              <div className="abt-stat-item">💰 No Brokerage</div>
              <div className="abt-stat-item">✔️ 100% Verified</div>
              <div className="abt-stat-item">⭐ 500+ Deals</div>
            </div>
          </div>
          <div className="abt-image-side">
            <div className="abt-frame-standard">
              <img src={whyImage} alt="Why Us" />
            </div>
          </div>
        </div>
      </section>

      {/* Edge-to-Edge Footer CTA */}
      <section className="abt-cta-edge abt-reveal">
        <div className="abt-cta-inner">
          <h3>Ready to start your journey?</h3>
          <a href="https://wa.me/918328041624" className="abt-btn-edge">
            <i className="fa-brands fa-whatsapp"></i> CONNECT NOW
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;