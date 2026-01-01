import React, { useEffect } from 'react';
import './About.css';
import logo from "../assets/images/off_ani.jpg"; 
import missionImg from "../assets/images/Gemini_vision.png"; 
import whyImage from "../assets/images/why_us.png"; 

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

      {/* 1. Our Story: Text Left - Image Right */}
      <section className="abt-row abt-reveal">
        <div className="abt-content-box">
          <div className="abt-text-side">
            <h2 className="abt-title-edge">Our Story</h2>
            <p>Welcome to <strong>AK DreamVista</strong>, your trusted digital platform for genuine real estate connections. Founded in 2016, we have grown into one of the most reliable platforms in Telangana.</p>
            <p>We simplify property deals by connecting you directly with owners—removing high brokerage fees and hidden complexities.</p>
          </div>
          <div className="abt-image-side">
            <div className="abt-frame-standard">
              <img src={logo} alt="Office" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Our Vision: Image Left - Text Right (Zig-Zag) */}
      <section className="abt-row abt-bg-alt abt-reveal">
        <div className="abt-content-box abt-reverse">
          <div className="abt-text-side">
            <h2 className="abt-title-edge">Our Vision</h2>
            <p>To build a transparent and trusted digital marketplace where every property buyer and seller can connect directly, safely, and confidently.</p>
            <p>Our goal is to create a community where finding a home is a joyful, direct experience without intermediaries.</p>
          </div>
          <div className="abt-image-side">
            <div className="abt-frame-standard">
              <img src={missionImg} alt="Vision" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Mission: Text Left - Image Right (Zig-Zag) */}
      <section className="abt-row abt-reveal">
        <div className="abt-content-box">
          <div className="abt-text-side">
            <h2 className="abt-title-edge">Our Mission</h2>
            <ul className="abt-list-edge">
              <li><i className="fa-solid fa-check"></i> Verified and up-to-date listings</li>
              <li><i className="fa-solid fa-check"></i> Direct owner-to-buyer interaction</li>
              <li><i className="fa-solid fa-check"></i> Commission-free transparency</li>
            </ul>
          </div>
          <div className="abt-image-side">
            <div className="abt-frame-standard">
              <img src="https://images.unsplash.com/photo-1605146769289-440113cc3d00?q=80&w=2070&auto=format&fit=crop" alt="Mission" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Founder: Image Left - Text Right (Zig-Zag) */}
      <section className="abt-row abt-bg-alt abt-reveal">
        <div className="abt-content-box abt-reverse">
          <div className="abt-text-side">
            <h2 className="abt-title-edge">Our Founder</h2>
            <p>Founded by <strong>Anil Kumar</strong>, an entrepreneur passionate about bringing honesty and innovation to the real estate market.</p>
            <p>His vision is to make property transactions smooth, digital, and transparent for everyone across India.</p>
          </div>
          <div className="abt-image-side">
            <div className="abt-frame-founder">
              <img src="https://img.freepik.com/free-vector/leader-concept-illustration_114360-7860.jpg" alt="Founder" />
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