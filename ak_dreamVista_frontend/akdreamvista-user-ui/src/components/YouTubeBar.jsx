import React from 'react';
import './YouTubeBar.css'; // Path correct ga undha chuskondi

export default function YouTubeBar() {
  const channelLink = "https://www.youtube.com/@AKDreamVista";

  return (
    <section className="yt-global-bar">
      <div className="yt-container">
        <div className="yt-content">
          <div className="yt-icon-box">
            <i className="fa-brands fa-youtube"></i>
          </div>
          <div className="yt-text">
            <h3>Subscribe to <span>AK DreamVista</span></h3>
            <p>Watch property tours & drone views on YouTube.</p>
          </div>
        </div>
        <a 
          href={channelLink} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="yt-subscribe-btn"
        >
          SUBSCRIBE
        </a>
      </div>
    </section>
  );
}