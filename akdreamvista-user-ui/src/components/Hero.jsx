import React, { useState, useEffect } from "react";

import Hero1 from "../assets/images/banner1.jpg";
import Hero2 from "../assets/images/banner2.jpg";
import Hero4 from "../assets/images/banner3.jpg";
import Hero5 from "../assets/images/banner4.jpg";

import Hero7 from "../assets/images/banner5.jpg";


const heroImages = [Hero1, Hero2, Hero4, Hero5, Hero7];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
    }, 3000); // 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="hero"
      style={{
        backgroundImage: `url(${heroImages[index]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "50vh",
      }}
    >
      <div className="hero-overlay"></div>
    </section>



  );
}
