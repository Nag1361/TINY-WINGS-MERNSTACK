import React from 'react';
import './HeroSection.css';

const HeroSection = ({ title, subtitle, backgroundImage, ctaText, onCTA }) => {
  return (
    <section
      className="hero-section"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
      }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="hero-title">{title}</h1>
        <p className="hero-subtitle">{subtitle}</p>
        {ctaText && (
          <button onClick={onCTA} className="hero-cta">
            {ctaText}
          </button>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
